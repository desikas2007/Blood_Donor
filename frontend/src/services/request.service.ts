import { api } from "@/lib/api";
import { BloodRequest, RequestStatus } from "@/types/request";
import { dummyRequests } from "@/data/requests";

export async function getReceivedRequests(
  donorId: string
): Promise<BloodRequest[]> {
  // Frontend-only phase: filter dummy data
  return dummyRequests.filter((r) => r.donor_id === donorId);

  // When backend is ready:
  // const { data } = await api.get<BloodRequest[]>("/api/requests/received");
  // return data;
}

export async function getSentRequests(
  requesterId: string
): Promise<BloodRequest[]> {
  return dummyRequests.filter((r) => r.requester_id === requesterId);

  // When backend is ready:
  // const { data } = await api.get<BloodRequest[]>("/api/requests/sent");
  // return data;
}

export async function sendRequest(
  donorId: string,
  bloodGroup: string,
  message: string
): Promise<BloodRequest> {
  const newRequest: BloodRequest = {
    id: "r" + Date.now(),
    donor_id: donorId,
    donor_name: "Donor",
    donor_blood_group: "O+",
    donor_city: "City",
    requester_id: "req1",
    requester_name: "Requester",
    requester_type: "hospital",
    blood_group: bloodGroup,
    message,
    status: "pending",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  return newRequest;

  // When backend is ready:
  // const { data } = await api.post<BloodRequest>("/api/requests", { donorId, bloodGroup, message });
  // return data;
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
): Promise<BloodRequest> {
  const request = dummyRequests.find((r) => r.id === requestId);
  if (!request) throw new Error("Request not found");
  return { ...request, status, updated_at: new Date().toISOString() };

  // When backend is ready:
  // const { data } = await api.patch<BloodRequest>(`/api/requests/${requestId}/status`, { status });
  // return data;
}
