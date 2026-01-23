import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
