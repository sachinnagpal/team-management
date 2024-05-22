import { IsString, IsEmail, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateTeamMemberDto {
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  readonly phoneNumber?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsEnum(['admin', 'user'])
  @IsOptional()
  readonly role?: string;
}
