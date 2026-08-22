export interface DonorProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  email: string;
  blood_group: string;
  city: string;
  state: string;
  last_donation_date: string | null;
  available: boolean;
  created_at: string;
}

export interface DonorSearchFilters {
  blood_group?: string;
  city?: string;
}
