import { DonorProfile, DonorSearchFilters } from "@/types/donor";
import { dummyDonors } from "@/data/donors";

export async function searchDonors(
  filters: DonorSearchFilters
): Promise<DonorProfile[]> {
  // Frontend-only phase: filter dummy data
  let results = [...dummyDonors];
  if (filters.blood_group) {
    results = results.filter((d) => d.blood_group === filters.blood_group);
  }
  if (filters.city) {
    results = results.filter((d) =>
      d.city.toLowerCase().includes(filters.city!.toLowerCase())
    );
  }
  return results;

  // When backend is ready:
  // const { data } = await api.get<DonorProfile[]>("/api/donors", { params: filters });
  // return data;
}

export async function getDonorProfile(donorId: string): Promise<DonorProfile> {
  const donor = dummyDonors.find((d) => d.id === donorId);
  if (!donor) throw new Error("Donor not found");
  return donor;

  // When backend is ready:
  // const { data } = await api.get<DonorProfile>(`/api/donors/${donorId}`);
  // return data;
}

export async function updateDonorProfile(
  donorId: string,
  updates: Partial<DonorProfile>
): Promise<DonorProfile> {
  const donor = dummyDonors.find((d) => d.id === donorId);
  if (!donor) throw new Error("Donor not found");
  return { ...donor, ...updates };

  // When backend is ready:
  // const { data } = await api.patch<DonorProfile>(`/api/donors/${donorId}`, updates);
  // return data;
}
