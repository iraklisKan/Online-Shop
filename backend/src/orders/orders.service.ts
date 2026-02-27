import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(userId: number, productId: number) {
    return this.prismaService.order.create({
      data: { userId, productId },
      include: { product: true },
    });
  }

  async createOrdersBatch(userId: number, productIds: number[]) {
    // Use a transaction so all orders are created atomically
    return this.prismaService.$transaction(
      productIds.map((productId) =>
        this.prismaService.order.create({
          data: { userId, productId },
        }),
      ),
    );
  }

  async getUserOrders(userId: number) {
    return this.prismaService.order.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prismaService.order.findMany({
      include: { product: true, user: { select: { id: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
