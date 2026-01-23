import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRequest } from './dto/create-user.request';
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  public async createUser(createUserRequest: CreateUserRequest) {
    try {
      return await this.prismaService.user.create({
        data: {
          ...createUserRequest,
          password: await bcrypt.hash(createUserRequest.password, 10),
        },
        select: {
          id: true,
          email: true,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A user with this email already exists');
      }
      throw error;
    }
  }
}
