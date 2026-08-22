export type RequestStatus = "pending" | "accepted" | "rejected" | "completed";

export type UrgencyLevel = "normal" | "urgent" | "critical";

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
  required_units?: number;
  urgency?: UrgencyLevel;
  message: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
}
