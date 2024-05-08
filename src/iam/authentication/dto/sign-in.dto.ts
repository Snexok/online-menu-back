import { MinLength } from 'class-validator';

export class SignInDto {
  login: string;

  @MinLength(8)
  password: string;
}
