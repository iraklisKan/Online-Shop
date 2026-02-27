import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryRequest } from './dto/create-category.request';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory(createCategoryRequest: CreateCategoryRequest) {
    try {
      return await this.prismaService.category.create({
        data: createCategoryRequest,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A category with this name already exists');
      }
      throw error;
    }
  }

  async getCategories() {
    return this.prismaService.category.findMany({
      include: { _count: { select: { products: true } } },
    });
  }

  async deleteCategory(id: number) {
    return this.prismaService.category.delete({ where: { id } });
  }
}
