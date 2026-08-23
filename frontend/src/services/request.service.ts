import { api } from "@/lib/api";
import { BloodRequest, RequestStatus } from "@/types/request";
import { getMyRequesterProfile } from "@/services/requester.service";

/** Requests received by the logged-in donor */
export async function getReceivedRequests(): Promise<BloodRequest[]> {
  const { data } = await api.get<BloodRequest[]>("/requests/received");
  return data ?? [];
}

/** Requests sent by the logged-in hospital/organization */
export async function getSentRequests(): Promise<BloodRequest[]> {
  const { data } = await api.get<BloodRequest[]>("/requests/sent");
  return data ?? [];
}

export interface SendRequestDonor {
  id: string;
  full_name: string;
  blood_group: string;
  city: string;
}

export async function sendRequest(
  donor: SendRequestDonor,
  bloodGroup: string,
  message: string,
  urgency: string = "normal",
  requiredUnits: number = 1
): Promise<BloodRequest> {
  const requester = await getMyRequesterProfile();

  // urgency/units are not backend fields — carry them inside the message
  const prefix =
    urgency !== "normal"
      ? `[${urgency.toUpperCase()} - ${requiredUnits} unit${requiredUnits > 1 ? "s" : ""}] `
      : "";

  const { data } = await api.post<BloodRequest>("/requests", {
    donor_id: donor.id,
    donor_name: donor.full_name,
    donor_blood_group: donor.blood_group,
    donor_city: donor.city,
    requester_id: requester.id,
    requester_name: requester.name,
    requester_type: requester.type,
    blood_group: bloodGroup || donor.blood_group,
    message: `${prefix}${message}`.trim(),
  });
  return data;
}

export async function updateRequestStatus(
  requestId: string,
  status: RequestStatus
): Promise<BloodRequest> {
  const { data } = await api.patch<BloodRequest>(`/requests/${requestId}/status`, {
    status,
  });
  return data;
}
