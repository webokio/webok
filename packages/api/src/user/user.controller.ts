import { Controller, Inject, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IUserService, User, CreateUserData } from '@webok/core/lib/user'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('Users')
export class UserController {
  constructor (@Inject('IUserService') private readonly userService: IUserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({})
  create (@Body() data: CreateUserData): Promise<User> {
    return this.userService.create(data)
  }
}
