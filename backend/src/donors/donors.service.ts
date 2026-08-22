import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDonorDto } from "./dto/create-donor.dto";
import { UpdateDonorDto } from "./dto/update-donor.dto";

@Injectable()
export class DonorsService {
  // Placeholder: will be replaced with Supabase / database calls
  private donors: Array<any> = [];

  create(dto: CreateDonorDto) {
    const donor = {
      id: "d" + Date.now(),
      ...dto,
      available: true,
      created_at: new Date().toISOString(),
    };
    this.donors.push(donor);
    return donor;
  }

  findAll(filters?: { blood_group?: string; city?: string }) {
    let results = [...this.donors];
    if (filters?.blood_group) {
      results = results.filter((d) => d.blood_group === filters.blood_group);
    }
    if (filters?.city) {
      results = results.filter((d) =>
        d.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }
    return results;
  }

  findOne(id: string) {
    const donor = this.donors.find((d) => d.id === id);
    if (!donor) throw new NotFoundException("Donor not found");
    return donor;
  }

  update(id: string, dto: UpdateDonorDto) {
    const index = this.donors.findIndex((d) => d.id === id);
    if (index === -1) throw new NotFoundException("Donor not found");
    this.donors[index] = { ...this.donors[index], ...dto };
    return this.donors[index];
  }
}
