import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    console.log(signInDto);
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    console.log({ accessToken, refreshToken });

    return { accessToken };
  }@HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() signInDto: SignInDto,
  ) {
    console.log(signInDto);
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    console.log({ accessToken, refreshToken });

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Body() refreshTokenDto: RefreshTokenDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.refreshTokens(refreshTokenDto);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });
    console.log({ accessToken, refreshToken });

    return { accessToken };
  }
}
