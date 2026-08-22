import { BloodRequest, RequestStatus, UrgencyLevel } from "@/types/request";
import { dummyRequests } from "@/data/requests";

let requests = [...dummyRequests];

export async function getReceivedRequests(
  donorId: string
): Promise<BloodRequest[]> {
  return requests.filter((r) => r.donor_id === donorId);
}

export async function getSentRequests(
  requesterId: string
): Promise<BloodRequest[]> {
  return requests.filter((r) => r.requester_id === requesterId);
}

export async function sendRequest(
  donorId: string,
  bloodGroup: string,
  message: string,
  urgency: UrgencyLevel = "normal",
  requiredUnits: number = 1
): Promise<BloodRequest> {
  const donor = (await import("@/data/donors")).dummyDonors.find(
    (d) => d.id === donorId
  );
  const newRequest: BloodRequest = {
    id: "r" + Date.now(),
    donor_id: donorId,
    donor_name: donor?.full_name || "Unknown Donor",
    donor_blood_group: donor?.blood_group || bloodGroup,
    donor_city: donor?.city || "Unknown",
    requester_id: "req1",
    requester_name: "Requester",
    requester_type: "hospital",
    blood_group: bloodGroup,
    required_units: requiredUnits,
    urgency,
    message,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  requests = [...requests, newRequest];
  return newRequest;
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
): Promise<BloodRequest> {
  const request = requests.find((r) => r.id === requestId);
  if (!request) throw new Error("Request not found");
  const updated = {
    ...request,
    status,
    updated_at: new Date().toISOString(),
  };
  requests = requests.map((r) => (r.id === requestId ? updated : r));
  return updated;
}
