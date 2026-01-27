import { Controller, Post, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth-guard';
import { UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from './current-user.decorator';
import type { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }
}
