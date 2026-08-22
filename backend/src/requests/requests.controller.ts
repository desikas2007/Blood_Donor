import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("requests")
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get("sent")
  @UseGuards(JwtAuthGuard)
  async getSent(@CurrentUser() user: any) {
    const requesterId = await this.requestsService.findRequesterIdByUserId(
      user.sub
    );
    return this.requestsService.findByRequester(requesterId);
  }

  @Get("received")
  @UseGuards(JwtAuthGuard)
  async getReceived(@CurrentUser() user: any) {
    const donorId = await this.requestsService.findDonorIdByUserId(user.sub);
    return this.requestsService.findByDonor(donorId);
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.requestsService.updateStatus(id, updateStatusDto.status);
  }
}
