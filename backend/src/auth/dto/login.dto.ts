import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(["public", "donor", "hospital", "organization"])
  role: string;
}
