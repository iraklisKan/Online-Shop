import { Controller, Get, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { CurrentUser } from '../auth/current-user.decorator';
import type { TokenPayload } from '../auth/interfaces/token-payload.interface';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('my')
  getMyOrders(@CurrentUser() user: TokenPayload) {
    return this.ordersService.getUserOrders(user.userId);
  }

  @Get()
  @Roles(Role.ADMIN)
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
}
