import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRequestDto } from "./dto/create-request.dto";

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRequestDto) {
    const request = await this.prisma.bloodRequest.create({
      data: {
        donorId: dto.donor_id,
        donorName: dto.donor_name,
        donorBloodGroup: dto.donor_blood_group,
        donorCity: dto.donor_city,
        requesterId: dto.requester_id,
        requesterName: dto.requester_name,
        requesterType: dto.requester_type,
        bloodGroup: dto.blood_group,
        message: dto.message ?? "",
      },
    });
    return this.serialize(request);
  }

  async findByDonor(donorId: string) {
    const requests = await this.prisma.bloodRequest.findMany({
      where: { donorId },
      orderBy: { createdAt: "desc" },
    });
    return requests.map((r) => this.serialize(r));
  }

  async findByRequester(requesterId: string) {
    const requests = await this.prisma.bloodRequest.findMany({
      where: { requesterId },
      orderBy: { createdAt: "desc" },
    });
    return requests.map((r) => this.serialize(r));
  }

  async findDonorIdByUserId(userId: string): Promise<string> {
    const donor = await this.prisma.donor.findUnique({
      where: { userId },
    });
    if (!donor) throw new NotFoundException("Donor profile not found");
    return donor.id;
  }

  async findRequesterIdByUserId(userId: string): Promise<string> {
    const requester = await this.prisma.requester.findUnique({
      where: { userId },
    });
    if (!requester) throw new NotFoundException("Requester profile not found");
    return requester.id;
  }

  async updateStatus(id: string, status: string) {
    const existing = await this.prisma.bloodRequest.findUnique({
      where: { id },
    });
    if (!existing) throw new NotFoundException("Request not found");

    const request = await this.prisma.bloodRequest.update({
      where: { id },
      data: { status },
    });
    return this.serialize(request);
  }

  private serialize(request: any) {
    return {
      id: request.id,
      donor_id: request.donorId,
      donor_name: request.donorName,
      donor_blood_group: request.donorBloodGroup,
      donor_city: request.donorCity,
      requester_id: request.requesterId,
      requester_name: request.requesterName,
      requester_type: request.requesterType,
      blood_group: request.bloodGroup,
      message: request.message,
      status: request.status,
      created_at: request.createdAt.toISOString(),
      updated_at: request.updatedAt.toISOString(),
    };
  }
}
