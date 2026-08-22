import { api } from "@/lib/api";
import { DonorProfile, DonorSearchFilters } from "@/types/donor";

export async function searchDonors(
  filters: DonorSearchFilters
): Promise<DonorProfile[]> {
  const params: Record<string, string> = {};
  if (filters.blood_group) params.blood_group = filters.blood_group;
  if (filters.city) params.city = filters.city;

  const { data } = await api.get<DonorProfile[]>("/donors", { params });
  return data;
}

export async function getMyDonorProfile(): Promise<DonorProfile> {
  const { data } = await api.get<DonorProfile>("/donors/me");
  return data;
}

export async function getDonorProfile(donorId: string): Promise<DonorProfile> {
  const { data } = await api.get<DonorProfile>(`/donors/${donorId}`);
  return data;
}

export async function updateDonorProfile(
  donorId: string,
  updates: Partial<DonorProfile>
): Promise<DonorProfile> {
  const { data } = await api.patch<DonorProfile>(
    `/donors/${donorId}`,
    updates
  );
  return data;
}
