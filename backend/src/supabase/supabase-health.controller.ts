import { Controller, Get } from "@nestjs/common";
import { SupabaseService } from "./supabase.service";

@Controller("health")
export class SupabaseHealthController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async check() {
    const db = await this.supabase.healthCheck();
    return {
      status: db.database === "connected" ? "ok" : "degraded",
      ...db,
    };
  }
}
