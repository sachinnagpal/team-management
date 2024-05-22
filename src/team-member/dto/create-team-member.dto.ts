import { IsString, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber(null)
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(['admin', 'user'])
  readonly role: string;
}
