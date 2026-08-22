import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRequesterDto } from "./dto/create-requester.dto";
import { UpdateRequesterDto } from "./dto/update-requester.dto";

@Injectable()
export class RequestersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRequesterDto) {
    const requester = await this.prisma.requester.create({
      data: {
        type: dto.type,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        city: dto.city,
        state: dto.state,
        address: dto.address,
        organizationType: dto.organization_type ?? null,
      },
    });
    return this.serialize(requester);
  }

  async findOne(id: string) {
    const requester = await this.prisma.requester.findUnique({
      where: { id },
    });
    if (!requester) throw new NotFoundException("Requester not found");
    return this.serialize(requester);
  }

  async findOneByUserId(userId: string) {
    const requester = await this.prisma.requester.findUnique({
      where: { userId },
    });
    if (!requester) throw new NotFoundException("Requester profile not found");
    return this.serialize(requester);
  }

  async update(id: string, dto: UpdateRequesterDto) {
    const existing = await this.prisma.requester.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException("Requester not found");

    const requester = await this.prisma.requester.update({
      where: { id },
      data: {
        type: dto.type,
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        city: dto.city,
        state: dto.state,
        address: dto.address,
        organizationType: dto.organization_type,
      },
    });
    return this.serialize(requester);
  }

  private serialize(requester: any) {
    return {
      id: requester.id,
      user_id: requester.userId,
      type: requester.type,
      name: requester.name,
      phone: requester.phone,
      email: requester.email,
      city: requester.city,
      state: requester.state,
      address: requester.address,
      organization_type: requester.organizationType,
      created_at: requester.createdAt.toISOString(),
      updated_at: requester.updatedAt.toISOString(),
    };
  }
}
