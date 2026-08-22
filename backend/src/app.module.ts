import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DonorsModule } from "./donors/donors.module";
import { RequestersModule } from "./requesters/requesters.module";
import { RequestsModule } from "./requests/requests.module";

@Module({
  imports: [AuthModule, DonorsModule, RequestersModule, RequestsModule],
})
export class AppModule {}
