import { MinLength } from 'class-validator';

export class SignUpDto {
  login: string;

  @MinLength(8)
  password: string;
}
