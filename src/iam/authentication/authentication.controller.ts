import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import { Roles } from '../authorization/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

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
    const { accessToken, refreshToken } =
      await this.authService.signIn(signInDto);
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return { accessToken };
  }

  @HttpCode(HttpStatus.OK)
  @Get('refresh-tokens')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (!request.cookies.refreshToken) return "Have'nt refreshToken";

    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      request.cookies.refreshToken,
    );
    response.cookie('refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return { accessToken };
  }

  @Get('check-admin')
  @Auth(AuthType.Bearer)
  @Roles(Role.Admin)
  checkAdmin() {
    return true;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('refreshToken', '', {
      secure: true,
      httpOnly: true,
      sameSite: true,
    });

    return { accessToken: '' };
  }
}
