import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSessionRequest } from './dto/create-session.request';
import { CheckoutService } from './checkout.service';
import { CurrentUser } from '../auth/current-user.decorator';
import type { TokenPayload } from '../auth/interfaces/token-payload.interface';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('session')
  @UseGuards(JwtAuthGuard)
  async createSession(
    @Body() createSessionRequest: CreateSessionRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.checkoutService.createSession(createSessionRequest.productIds, user.userId);
  }

  @Post('webhook')
  async handleCheckoutWebhook(@Body() event: any) {
    return this.checkoutService.handleCheckoutWebhook(event);
  }
}
