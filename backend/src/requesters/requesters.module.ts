import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { RequestersController } from "./requesters.controller";
import { RequestersService } from "./requesters.service";

@Module({
  imports: [AuthModule],
  controllers: [RequestersController],
  providers: [RequestersService],
  exports: [RequestersService],
})
export class RequestersModule {}
