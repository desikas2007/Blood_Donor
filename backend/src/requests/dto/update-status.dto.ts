import { IsEnum } from "class-validator";

export class UpdateStatusDto {
  @IsEnum(["pending", "accepted", "rejected", "completed"])
  status: string;
}
