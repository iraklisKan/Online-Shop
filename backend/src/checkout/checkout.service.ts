import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly stripe: Stripe,
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly configService: ConfigService,
  ) {}

  async createSession(productIds: number[], userId: number) {
    // Fetch all products in parallel
    const products = await Promise.all(
      productIds.map((id) => this.productsService.getProduct(id)),
    );

    // Guard: reject if any product is already sold
    const unavailable = products.filter((p) => p.sold);
    if (unavailable.length > 0) {
      throw new BadRequestException(
        `No longer available: ${unavailable.map((p) => p.name).join(', ')}`,
      );
    }

    return this.stripe.checkout.sessions.create({
      metadata: {
        productIds: productIds.join(','),
        userId: userId.toString(),
      },
      mode: 'payment',
      success_url: this.configService.getOrThrow('STRIPE_SUCCESS_URL'),
      cancel_url: this.configService.getOrThrow('STRIPE_CANCEL_URL'),
      line_items: products.map((product) => ({
        price_data: {
          currency: 'EUR',
          unit_amount: Math.round(product.price * 100),
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: 1,
      })),
    });
  }

  async handleCheckoutWebhook(event: any) {
    if (event.type !== 'checkout.session.completed') {
      return;
    }
    const session = await this.stripe.checkout.sessions.retrieve(
      event.data.object.id,
    );
    if (session.metadata?.productIds && session.metadata?.userId) {
      const productIds = session.metadata.productIds.split(',').map(Number);
      const userId = Number(session.metadata.userId);
      // Mark all products sold and create orders in parallel
      await Promise.all([
        ...productIds.map((id) => this.productsService.update(id, { sold: true })),
        this.ordersService.createOrdersBatch(userId, productIds),
      ]);
    }
  }
}
