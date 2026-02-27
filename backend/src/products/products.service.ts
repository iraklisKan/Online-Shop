import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductRequest } from './dto/create-product.request';
import { promises as fs } from 'fs';
import { join } from 'path';
import { PRODUCT_IMAGES } from './constants/product-images';
import { Prisma } from '@prisma/client';
import { ProductsGateway } from './products.gateway';


@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productsGateway: ProductsGateway,
  ) {}

  async createProduct(
    createProductRequest: CreateProductRequest,
    userId: number,
  ) {
    const product = await this.prismaService.product.create({
      data: {
        ...createProductRequest,
        userId,
      },
    });
    this.productsGateway.handleProductUpdated();
    return product;
  }

  async getProducts(status?: string, search?: string, categoryId?: number) {
    const args: Prisma.ProductFindManyArgs = { where: {} };
    if (status === 'available') {
      args.where = { ...args.where, sold: false };
    }
    if (search) {
      args.where = {
        ...args.where,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      };
    }
    if (categoryId) {
      args.where = { ...args.where, categoryId };
    }
    const products = await this.prismaService.product.findMany(args);
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageExists: await this.imageExists(product.id),
      })),
    );
  }

  private async imageExists(productId: number) {
    try {
      await fs.access(
        join(PRODUCT_IMAGES, `${productId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async getProduct(productId: number) {
    try {
      const product = await this.prismaService.product.findUniqueOrThrow({
        where: {
          id: productId,
        },
      });
      return {
        ...product,
        imageExists: await this.imageExists(productId),
      };
    } catch (error) {
      throw new NotFoundException(`Product not found with ID ${productId}`);
    }
  }

  async update(productId: number, data: Prisma.ProductUpdateInput) {
    await this.prismaService.product.update({
      where: {
        id: productId,
      },
      data,
    });
    this.productsGateway.handleProductUpdated();
  }
}
