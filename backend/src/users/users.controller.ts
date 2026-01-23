import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { create } from 'domain';
import { NoFilesInterceptor } from '@nestjs/platform-express';


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}   

@Post()
@UseInterceptors(NoFilesInterceptor())
public async createUser(@Body() createUserRequest:CreateUserRequest) {
    return this.usersService.createUser(createUserRequest);


}
}
