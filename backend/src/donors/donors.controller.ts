import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
} from "@nestjs/common";
import { DonorsService } from "./donors.service";
import { CreateDonorDto } from "./dto/create-donor.dto";
import { UpdateDonorDto } from "./dto/update-donor.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/current-user.decorator";

@Controller("donors")
export class DonorsController {
  constructor(private readonly donorsService: DonorsService) {}

  @Post()
  create(@Body() createDonorDto: CreateDonorDto) {
    return this.donorsService.create(createDonorDto);
  }

  @Get()
  findAll(
    @Query("blood_group") bloodGroup?: string,
    @Query("city") city?: string
  ) {
    return this.donorsService.findAll({ blood_group: bloodGroup, city });
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser() user: any) {
    return this.donorsService.findOneByUserId(user.sub);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.donorsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDonorDto: UpdateDonorDto) {
    return this.donorsService.update(id, updateDonorDto);
  }
}
