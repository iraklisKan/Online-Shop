import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import type { Response } from 'express';
import type { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import ms = require('ms');
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException('Invalid credentials');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: User, response: Response) {
    const expires = new Date();
    const expiresInStr = this.configService.getOrThrow<string>(
      'JWT_COOKIE_EXPIRES_IN',
    );
    const milliseconds = ms(expiresInStr as ms.StringValue);
    expires.setMilliseconds(expires.getMilliseconds() + milliseconds);

    const tokenPayload: TokenPayload = { userId: user.id };
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: true,
      expires,
    });

    return { tokenPayload };
  }
}
