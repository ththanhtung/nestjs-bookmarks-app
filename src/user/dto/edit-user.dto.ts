import { IsOptional, IsEmail, IsString } from "class-validator";

export class EditUserDto {
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  firsname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;
}
