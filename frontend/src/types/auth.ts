export type UserRole = "public" | "donor" | "hospital" | "organization";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
}

/** Registered user stored in localStorage (includes password for mock auth) */
export interface StoredUser extends User {
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  // Donor-specific
  blood_group?: string;
  date_of_birth?: string;
  city?: string;
  state?: string;
  last_donation_date?: string;
  // Hospital-specific
  hospital_name?: string;
  address?: string;
  // Organization-specific
  organization_name?: string;
  organization_type?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
