import { Global, Module } from "@nestjs/common";
import { SupabaseService } from "./supabase.service";
import { SupabaseHealthController } from "./supabase-health.controller";

@Global()
@Module({
  controllers: [SupabaseHealthController],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
