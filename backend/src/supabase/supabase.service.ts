import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SupabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SupabaseService.name);
  private apiClient: SupabaseClient | null = null;
  private adminClient: SupabaseClient | null = null;
  private connected = false;

  constructor(private readonly prisma: PrismaService) {}

  private isValidUrl(url?: string): boolean {
    return !!url && /^https:\/\/[^\s<>"']+$/.test(url) && url.includes(".");
  }

  /** Public/anon-key client for Supabase API access */
  get api(): SupabaseClient {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;

    if (!this.apiClient) {
      if (!url || !anonKey || !this.isValidUrl(url)) {
        throw new InternalServerErrorException(
          "SUPABASE_URL / SUPABASE_ANON_KEY are not configured in backend .env"
        );
      }
      this.apiClient = createClient(url, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    }
    return this.apiClient;
  }

  /** Service-role client for privileged operations */
  get admin(): SupabaseClient {
    const url = process.env.SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!this.adminClient) {
      if (!url || !serviceKey || !this.isValidUrl(url)) {
        throw new InternalServerErrorException(
          "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are not configured in backend .env"
        );
      }
      this.adminClient = createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    }
    return this.adminClient;
  }

  async onModuleInit() {
    const health = await this.healthCheck();
    if (health.database === "connected") {
      this.logger.log("Database connection verified (Supabase Postgres)");
    }

    if (!this.isValidUrl(process.env.SUPABASE_URL)) {
      this.logger.warn(
        "SUPABASE_URL / SUPABASE_ANON_KEY not configured - Supabase API disabled (Prisma DB still works)"
      );
    }
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }

  isDbConnected() {
    return this.connected;
  }

  async healthCheck() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { database: "connected" };
    } catch (error) {
      return { database: "disconnected", error: String(error).slice(0, 200) };
    }
  }
}
