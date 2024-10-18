import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "../users.service";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
    message: "Valid role is required",
  })
  role: UserRole;
}
