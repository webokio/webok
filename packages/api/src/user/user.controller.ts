import { Controller, Post, Body } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { UserDto, CreateUserDto } from '@webok/core/lib/user'
import { UserService } from '@webok/services/lib/user'

@Controller('users')
@ApiUseTags('Users')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse({})
  async create (@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const userDto: UserDto = await this.userService.create(createUserDto)
    return userDto
  }
}
