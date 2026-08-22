import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from "@nestjs/common";
import { RequestsService } from "./requests.service";
import { CreateRequestDto } from "./dto/create-request.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";

@Controller("requests")
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto);
  }

  @Get("sent")
  getSent() {
    // TODO: Extract requester_id from JWT token
    return this.requestsService.findByRequester("me");
  }

  @Get("received")
  getReceived() {
    // TODO: Extract donor_id from JWT token
    return this.requestsService.findByDonor("me");
  }

  @Patch(":id/status")
  updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return this.requestsService.updateStatus(id, updateStatusDto.status);
  }
}
