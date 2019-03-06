import { Controller, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { UserService, User, CreateUserData } from '@webok/core/lib/user'

@Controller('users')
@ApiUseTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({})
  create (@Body() data: CreateUserData): Promise<User> {
    return this.userService.create(data)
  }
}
