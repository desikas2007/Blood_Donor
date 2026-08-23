export type RequesterType = "hospital" | "organization";

export interface RequesterProfile {
  id: string;
  user_id: string;
  type: RequesterType;
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  address: string;
  organization_type?: string | null;
  created_at: string;
  updated_at?: string;
}
