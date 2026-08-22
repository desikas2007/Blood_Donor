import { RequesterProfile } from "@/types/requester";

export async function getRequesterProfile(
  requesterId: string
): Promise<RequesterProfile> {
  // Frontend-only phase: placeholder
  return {
    id: requesterId,
    user_id: "u10",
    type: "hospital",
    name: "City Hospital",
    phone: "+91-9876543220",
    email: "cityhospital@example.com",
    city: "Tiruchengode",
    state: "Tamil Nadu",
    address: "123 Main Road, Tiruchengode",
    created_at: "2026-01-05T00:00:00Z",
  };

  // When backend is ready:
  // const { data } = await api.get<RequesterProfile>(`/api/requesters/${requesterId}`);
  // return data;
}

export async function updateRequesterProfile(
  requesterId: string,
  updates: Partial<RequesterProfile>
): Promise<RequesterProfile> {
  const profile = await getRequesterProfile(requesterId);
  return { ...profile, ...updates };

  // When backend is ready:
  // const { data } = await api.patch<RequesterProfile>(`/api/requesters/${requesterId}`, updates);
  // return data;
}
