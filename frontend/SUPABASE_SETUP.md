# 🩸 Supabase Setup & Connection Guide

## Overview

This guide walks you through setting up the Supabase database and connecting it to the Blood Donor Portal frontend.

---

## Step 1 — Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up / log in.
2. Click **"New Project"**.
3. Fill in:
   - **Organization**: Select or create one.
   - **Project Name**: `blood-donor-portal` (or your choice).
   - **Database Password**: Choose a strong password (save it!).
   - **Region**: Choose closest to your users (e.g., `Southeast Asia` or `India`).
4. Click **"Create new project"** — wait ~2 minutes for it to spin up.

---

## Step 2 — Run the SQL Schema

1. In your Supabase Dashboard, go to **SQL Editor** (left sidebar).
2. Click **"New Query"**.
3. Open the file [`supabase/schema.sql`](../supabase/schema.sql) from this project.
4. **Copy the entire contents** and paste it into the SQL Editor.
5. Click **"Run"** (or press `Ctrl+Enter`).
6. Verify success — you should see all tables created:
   - `profiles`
   - `donors`
   - `requesters`
   - `blood_requests`

### What the schema creates

| Table | Purpose |
|-------|---------|
| `profiles` | Extends Supabase auth — stores role, name, phone |
| `donors` | Donor profiles — blood group, city, availability |
| `requesters` | Hospital & Organization profiles |
| `blood_requests` | Blood request lifecycle (pending → accepted → completed) |

Plus:
- **Trigger** to auto-create a `profiles` row when a user signs up.
- **RLS policies** for row-level security.
- **Indexes** for fast search/filter queries.
- **Updated_at trigger** for blood requests.

---

## Step 3 — Get Your API Keys

1. In Supabase Dashboard, go to **Settings → API** (gear icon, left sidebar).
2. Copy these two values:

| Key | Where to find it |
|-----|-------------------|
| **Project URL** | Under "Project URL" — looks like `https://xxxx.supabase.co` |
| **anon public key** | Under "Project API keys" → `anon` `public` — starts with `eyJ...` |

---

## Step 4 — Create Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
# frontend/.env.local

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ **Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

---

## Step 5 — Install the Supabase Client Library

```bash
cd frontend
npm install @supabase/supabase-js
```

A pre-configured client is already available at `src/lib/supabase.ts`:

```typescript
import { supabase } from "@/lib/supabase";
```

---

## Step 6 — Verify the Connection

Test the connection by adding a quick check in your code or running:

```typescript
import { supabase } from "@/lib/supabase";

// Test: fetch profiles table (should be empty initially)
const { data, error } = await supabase.from("profiles").select("*");
console.log("Profiles:", data, "Error:", error);
```

If you see `Profiles: [] Error: null`, the connection is working.

---

## Step 7 — Enable Email Auth (Optional)

By default, Supabase has email/password auth enabled. To configure:

1. Go to **Authentication → Providers** in the Dashboard.
2. Ensure **Email** is enabled.
3. (Optional) Disable email confirmations for development:
   - Go to **Authentication → Providers → Email**
   - Toggle off **"Confirm email"** for faster dev testing.

---

## Step 8 — Row Level Security (RLS) Policies

The schema already includes RLS policies. Here's what each table allows:

### profiles

| Action | Who | Policy |
|--------|-----|--------|
| SELECT | Everyone | Public read |
| INSERT | Own user only | `auth.uid() = id` |
| UPDATE | Own user only | `auth.uid() = id` |

### donors

| Action | Who | Policy |
|--------|-----|--------|
| SELECT | Everyone | Public read (needed for donor search) |
| INSERT | Own profile | `auth.uid() = user_id` |
| UPDATE | Own profile | `auth.uid() = user_id` |

### requesters

| Action | Who | Policy |
|--------|-----|--------|
| SELECT | Everyone | Public read |
| INSERT | Own profile | `auth.uid() = user_id` |
| UPDATE | Own profile | `auth.uid() = user_id` |

### blood_requests

| Action | Who | Policy |
|--------|-----|--------|
| SELECT | Donor or Requester involved | Via subquery check |
| INSERT | Requester only | Must own the requester profile |
| UPDATE | Donor only | Must own the donor profile (accept/reject) |

---

## Step 9 — Update Frontend Services (When Ready)

Replace mock data calls with real Supabase calls. Example:

### Before (mock):
```typescript
export async function searchDonors(filters: DonorSearchFilters): Promise<DonorProfile[]> {
  let results = [...dummyDonors];
  if (filters.blood_group) {
    results = results.filter((d) => d.blood_group === filters.blood_group);
  }
  return results;
}
```

### After (Supabase):
```typescript
import { supabase } from "@/lib/supabase";

export async function searchDonors(filters: DonorSearchFilters): Promise<DonorProfile[]> {
  let query = supabase
    .from("donors")
    .select("*")
    .eq("available", true);

  if (filters.blood_group) {
    query = query.eq("blood_group", filters.blood_group);
  }
  if (filters.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as DonorProfile[];
}
```

### Registration flow:
```typescript
import { supabase } from "@/lib/supabase";

export async function register(payload: RegisterPayload) {
  // Step 1: Sign up via Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        role: payload.role,
        full_name: payload.name,
        phone: payload.phone,
      },
    },
  });

  if (error) throw error;

  // Step 2: Create role-specific profile
  if (payload.role === "donor") {
    await supabase.from("donors").insert({
      user_id: data.user!.id,
      blood_group: payload.blood_group!,
      city: payload.city!,
      state: payload.state || "Tamil Nadu",
    });
  } else if (payload.role === "hospital" || payload.role === "organization") {
    await supabase.from("requesters").insert({
      user_id: data.user!.id,
      type: payload.role,
      name: payload.hospital_name || payload.organization_name!,
      city: payload.city!,
      state: payload.state || "Tamil Nadu",
      address: payload.address || "",
      organization_type: payload.organization_type,
    });
  }

  return {
    user: data.user,
    token: data.session?.access_token || "",
  };
}
```

---

## Quick Reference — Table Relationships

```text
auth.users (Supabase managed)
    │
    │ 1:1
    ▼
profiles (role, name, phone)
    │
    ├── 1:1 ──► donors (blood_group, city, available)
    │
    ├── 1:1 ──► requesters (type: hospital|organization)
    │
    └── blood_requests
              │
              ├── donor_id ──► donors.id
              └── requester_id ──► requesters.id
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `relation "profiles" does not exist` | Re-run the schema.sql in SQL Editor |
| `new row violates row-level security` | Check RLS policies; ensure user is authenticated |
| `invalid supabase url` | Check `.env.local` — URL must start with `https://` |
| `permission denied for table` | Ensure RLS policies allow the operation |
| Auth works but profiles empty | Check the trigger was created — run `SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created'` |

---

## Next Steps

1. ✅ Run schema.sql in Supabase
2. ✅ Set up `.env.local`
3. ✅ Install `@supabase/supabase-js`
4. 🔲 Replace mock auth with Supabase Auth
5. 🔲 Replace mock donor search with Supabase queries
6. 🔲 Replace mock request flows with Supabase queries
7. 🔲 Test end-to-end: register → login → search → send request
