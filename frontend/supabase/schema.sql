-- ============================================================
-- Blood Donor Search & Request Portal — Supabase Schema
-- ============================================================
-- Run this SQL in your Supabase SQL Editor:
--   Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- ============================================================
-- 1. PROFILES TABLE (extends Supabase auth.users)
-- ============================================================
-- Supabase provides auth.users automatically.
-- This table stores app-specific role & profile data.
-- Created via trigger on auth.users signup.

CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK (role IN ('donor', 'hospital', 'organization', 'public')),
  full_name   TEXT,
  phone       TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles (for public donor search, etc.)
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================================
-- 2. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ============================================================
-- When a new user signs up via Supabase Auth,
-- automatically insert a row into profiles with role='public'.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'public'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after a new user is created in auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 3. DONORS TABLE
-- ============================================================
-- One-to-one with profiles (profile must have role='donor').

CREATE TABLE IF NOT EXISTS donors (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blood_group         TEXT NOT NULL CHECK (blood_group IN (
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  )),
  date_of_birth       DATE,
  city                TEXT NOT NULL,
  state               TEXT NOT NULL DEFAULT 'Tamil Nadu',
  last_donation_date  DATE,
  available           BOOLEAN DEFAULT true,
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;

-- Public read access (for donor search)
CREATE POLICY "Donors are viewable by everyone"
  ON donors FOR SELECT
  USING (true);

-- Donors can insert their own profile
CREATE POLICY "Donors can insert own profile"
  ON donors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Donors can update their own profile
CREATE POLICY "Donors can update own profile"
  ON donors FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- 4. REQUESTERS TABLE (Hospitals + Organizations)
-- ============================================================
-- One-to-one with profiles (profile must have role='hospital' or 'organization').

CREATE TABLE IF NOT EXISTS requesters (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type                TEXT NOT NULL CHECK (type IN ('hospital', 'organization')),
  name                TEXT NOT NULL,
  city                TEXT NOT NULL,
  state               TEXT NOT NULL DEFAULT 'Tamil Nadu',
  address             TEXT,
  organization_type   TEXT,  -- Only for organizations (e.g., 'NGO', 'Blood Bank', 'Charity')
  created_at          TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE requesters ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Requesters are viewable by everyone"
  ON requesters FOR SELECT
  USING (true);

-- Requesters can insert their own profile
CREATE POLICY "Requesters can insert own profile"
  ON requesters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Requesters can update their own profile
CREATE POLICY "Requesters can update own profile"
  ON requesters FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================================
-- 5. BLOOD REQUESTS TABLE
-- ============================================================
-- Connects requesters (hospitals/orgs) to donors.

CREATE TABLE IF NOT EXISTS blood_requests (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_id        UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  requester_id    UUID NOT NULL REFERENCES requesters(id) ON DELETE CASCADE,
  blood_group     TEXT NOT NULL CHECK (blood_group IN (
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
  )),
  message         TEXT NOT NULL DEFAULT '',
  status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'accepted', 'rejected', 'completed'
  )),
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;

-- Donors can view requests sent to them
CREATE POLICY "Donors can view their received requests"
  ON blood_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM donors
      WHERE donors.id = blood_requests.donor_id
        AND donors.user_id = auth.uid()
    )
  );

-- Requesters can view requests they sent
CREATE POLICY "Requesters can view their sent requests"
  ON blood_requests FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM requesters
      WHERE requesters.id = blood_requests.requester_id
        AND requesters.user_id = auth.uid()
    )
  );

-- Requesters can create new blood requests
CREATE POLICY "Requesters can create blood requests"
  ON blood_requests FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM requesters
      WHERE requesters.id = blood_requests.requester_id
        AND requesters.user_id = auth.uid()
    )
  );

-- Donors can update status (accept/reject/complete)
CREATE POLICY "Donors can update request status"
  ON blood_requests FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM donors
      WHERE donors.id = blood_requests.donor_id
        AND donors.user_id = auth.uid()
    )
  );

-- ============================================================
-- 6. INDEXES (Performance for search & filtering)
-- ============================================================

-- Donor search by blood_group + city
CREATE INDEX IF NOT EXISTS idx_donors_blood_group ON donors(blood_group);
CREATE INDEX IF NOT EXISTS idx_donors_city ON donors(city);
CREATE INDEX IF NOT EXISTS idx_donors_available ON donors(available);
CREATE INDEX IF NOT EXISTS idx_donors_blood_city ON donors(blood_group, city);

-- Requester search by type + city
CREATE INDEX IF NOT EXISTS idx_requesters_type ON requesters(type);
CREATE INDEX IF NOT EXISTS idx_requesters_city ON requesters(city);

-- Blood request lookups
CREATE INDEX IF NOT EXISTS idx_requests_donor_id ON blood_requests(donor_id);
CREATE INDEX IF NOT EXISTS idx_requests_requester_id ON blood_requests(requester_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON blood_requests(status);

-- ============================================================
-- 7. UPDATED_AT TRIGGER (auto-set on blood_requests)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON blood_requests;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON blood_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- DONE ✅
-- ============================================================
-- Next steps:
--   1. Go to Supabase Dashboard → Settings → API
--   2. Copy "Project URL" and "anon" key
--   3. Add them to frontend/.env.local as:
--        NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
--        NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
--   4. Install Supabase client: npm install @supabase/supabase-js
--   5. Create frontend/src/lib/supabase.ts with client config
-- ============================================================
