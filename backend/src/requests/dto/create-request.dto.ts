import { IsNotEmpty, IsString } from "class-validator";

export class CreateRequestDto {
  @IsString()
  @IsNotEmpty()
  donor_id: string;

  @IsString()
  @IsNotEmpty()
  donor_name: string;

  @IsString()
  @IsNotEmpty()
  donor_blood_group: string;

  @IsString()
  @IsNotEmpty()
  donor_city: string;

  @IsString()
  @IsNotEmpty()
  requester_id: string;

  @IsString()
  @IsNotEmpty()
  requester_name: string;

  @IsString()
  @IsNotEmpty()
  requester_type: string;

  @IsString()
  @IsNotEmpty()
  blood_group: string;

  @IsString()
  message: string;
}
