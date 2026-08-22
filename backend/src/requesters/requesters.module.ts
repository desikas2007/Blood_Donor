import { Module } from "@nestjs/common";
import { RequestersController } from "./requesters.controller";
import { RequestersService } from "./requesters.service";

@Module({
  controllers: [RequestersController],
  providers: [RequestersService],
  exports: [RequestersService],
})
export class RequestersModule {}
