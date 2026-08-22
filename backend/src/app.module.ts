import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { SupabaseModule } from "./supabase/supabase.module";
import { AuthModule } from "./auth/auth.module";
import { DonorsModule } from "./donors/donors.module";
import { RequestersModule } from "./requesters/requesters.module";
import { RequestsModule } from "./requests/requests.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    DonorsModule,
    RequestersModule,
    RequestsModule,
  ],
})
export class AppModule {}
