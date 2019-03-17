import { Controller, Inject, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IUserService, IUser } from '@webok/core/lib/user'
import { User, CreateUserData } from '@webok/models/lib/user'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('Users')
export class UserController {
  constructor (@Inject('IUserService') private readonly userService: IUserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({})
  async create (@Body() data: CreateUserData): Promise<User> {
    const user: IUser = await this.userService.create(data)
    // Need to cast because IUser does not have passwordHash
    return user as User
  }
}
