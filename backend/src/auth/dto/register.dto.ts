import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  confirmPassword: string;

  @IsEnum(["public", "donor", "hospital", "organization"])
  role: string;

  // Donor-specific
  @IsOptional()
  @IsString()
  blood_group?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  last_donation_date?: string;

  // Hospital-specific
  @IsOptional()
  @IsString()
  hospital_name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  // Organization-specific
  @IsOptional()
  @IsString()
  organization_name?: string;

  @IsOptional()
  @IsString()
  organization_type?: string;
}
