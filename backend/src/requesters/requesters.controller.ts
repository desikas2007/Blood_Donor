import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
} from "@nestjs/common";
import { RequestersService } from "./requesters.service";
import { CreateRequesterDto } from "./dto/create-requester.dto";
import { UpdateRequesterDto } from "./dto/update-requester.dto";

@Controller("requesters")
export class RequestersController {
  constructor(private readonly requestersService: RequestersService) {}

  @Post()
  create(@Body() createRequesterDto: CreateRequesterDto) {
    return this.requestersService.create(createRequesterDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.requestersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRequesterDto: UpdateRequesterDto
  ) {
    return this.requestersService.update(id, updateRequesterDto);
  }
}
