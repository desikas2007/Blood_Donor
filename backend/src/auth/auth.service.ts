import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  // Placeholder: will be replaced with Supabase / database calls
  private users: Array<{
    id: string;
    email: string;
    role: string;
    password: string;
  }> = [];

  async register(dto: RegisterDto) {
    const exists = this.users.find((u) => u.email === dto.email);
    if (exists) {
      throw new UnauthorizedException("Email already registered");
    }

    const user = {
      id: "u" + Date.now(),
      email: dto.email,
      role: dto.role,
      password: dto.password, // Hash in production
    };
    this.users.push(user);

    return {
      user: { id: user.id, email: user.email, role: user.role, created_at: new Date().toISOString() },
      token: "jwt-token-" + user.id,
    };
  }

  async login(dto: LoginDto) {
    const user = this.users.find(
      (u) => u.email === dto.email && u.role === dto.role
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return {
      user: { id: user.id, email: user.email, role: user.role, created_at: new Date().toISOString() },
      token: "jwt-token-" + user.id,
    };
  }
}
