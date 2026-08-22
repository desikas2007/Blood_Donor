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
  created_at: string;
}
