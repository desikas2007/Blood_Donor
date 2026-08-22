import { api } from "@/lib/api";
import { RequesterProfile } from "@/types/requester";

export async function getMyRequesterProfile(): Promise<RequesterProfile> {
  const { data } = await api.get<RequesterProfile>("/requesters/me");
  return data;
}

export async function getRequesterProfile(
  requesterId: string
): Promise<RequesterProfile> {
  const { data } = await api.get<RequesterProfile>(
    `/requesters/${requesterId}`
  );
  return data;
}

export async function updateRequesterProfile(
  requesterId: string,
  updates: Partial<RequesterProfile>
): Promise<RequesterProfile> {
  const { data } = await api.patch<RequesterProfile>(
    `/requesters/${requesterId}`,
    updates
  );
  return data;
}
