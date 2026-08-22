import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateDonorDto } from "./dto/create-donor.dto";
import { UpdateDonorDto } from "./dto/update-donor.dto";

@Injectable()
export class DonorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDonorDto) {
    const donor = await this.prisma.donor.create({
      data: {
        fullName: dto.full_name,
        phone: dto.phone,
        email: dto.email,
        bloodGroup: dto.blood_group,
        city: dto.city,
        state: dto.state,
        available: dto.available,
        lastDonationDate: dto.last_donation_date ?? null,
      },
    });
    return this.serialize(donor);
  }

  async findAll(filters?: { blood_group?: string; city?: string }) {
    const donors = await this.prisma.donor.findMany({
      where: filters?.blood_group
        ? { bloodGroup: filters.blood_group }
        : undefined,
    });

    const results = filters?.city
      ? donors.filter((d) =>
          d.city.toLowerCase().includes(filters.city!.toLowerCase())
        )
      : donors;

    return results.map((d) => this.serialize(d));
  }

  async findOne(id: string) {
    const donor = await this.prisma.donor.findUnique({ where: { id } });
    if (!donor) throw new NotFoundException("Donor not found");
    return this.serialize(donor);
  }

  async findOneByUserId(userId: string) {
    const donor = await this.prisma.donor.findUnique({
      where: { userId },
    });
    if (!donor) throw new NotFoundException("Donor not found");
    return this.serialize(donor);
  }

  async update(id: string, dto: UpdateDonorDto) {
    const existing = await this.prisma.donor.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Donor not found");

    const donor = await this.prisma.donor.update({
      where: { id },
      data: {
        fullName: dto.full_name,
        phone: dto.phone,
        email: dto.email,
        bloodGroup: dto.blood_group,
        city: dto.city,
        state: dto.state,
        available: dto.available,
        lastDonationDate: dto.last_donation_date,
      },
    });
    return this.serialize(donor);
  }

  private serialize(donor: any) {
    return {
      id: donor.id,
      user_id: donor.userId,
      full_name: donor.fullName,
      phone: donor.phone,
      email: donor.email,
      blood_group: donor.bloodGroup,
      city: donor.city,
      state: donor.state,
      available: donor.available,
      last_donation_date: donor.lastDonationDate,
      created_at: donor.createdAt.toISOString(),
      updated_at: donor.updatedAt.toISOString(),
    };
  }
}
