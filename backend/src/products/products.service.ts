import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createProduct(
    createProductRequest: CreateProductRequest,
    userId: number,
  ) {
    return this.prismaService.product.create({
      data: {
        ...createProductRequest,
        userId,
      },
    });
  }

  async getProducts() {
    return this.prismaService.product.findMany();
  }
}
