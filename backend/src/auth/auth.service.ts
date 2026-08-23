import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) {
      throw new ConflictException("Email already registered");
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashed,
        role: dto.role,
        name: dto.name ?? null,
        phone: dto.phone ?? null,
      },
    });

    // Create profile based on role
    if (dto.role === "donor") {
      await this.prisma.donor.create({
        data: {
          userId: user.id,
          fullName: dto.name || dto.email,
          phone: dto.phone,
          email: dto.email,
          bloodGroup: dto.blood_group ?? "",
          city: dto.city ?? "",
          state: dto.state ?? "",
          lastDonationDate: dto.last_donation_date ?? null,
        },
      });
    }

    if (dto.role === "hospital" || dto.role === "organization") {
      await this.prisma.requester.create({
        data: {
          userId: user.id,
          type: dto.role,
          name:
            dto.hospital_name ||
            dto.organization_name ||
            dto.name ||
            dto.email,
          phone: dto.phone,
          email: dto.email,
          city: dto.city ?? "",
          state: dto.state ?? "",
          address: dto.address ?? "",
          organizationType: dto.organization_type ?? null,
        },
      });
    }

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Invalid credentials");
    }
    if (user.role !== dto.role) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: {
    id: string;
    email: string;
    role: string;
    createdAt: Date;
  }) {
    const token = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        created_at: user.createdAt.toISOString(),
      },
      token,
    };
  }
}
