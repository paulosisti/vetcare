import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

const message = 'Incorrect username or password.';

export class LoginDto {
  @IsString({ message })
  @IsNotEmpty({ message })
  @IsEmail()
  email: string;

  @IsString({ message })
  @IsNotEmpty({ message })
  password: string;
}
