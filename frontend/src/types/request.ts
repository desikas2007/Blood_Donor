export type RequestStatus = "pending" | "accepted" | "rejected" | "completed";

export interface BloodRequest {
  id: string;
  donor_id: string;
  donor_name: string;
  donor_blood_group: string;
  donor_city: string;
  requester_id: string;
  requester_name: string;
  requester_type: "hospital" | "organization";
  blood_group: string;
  message: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}
