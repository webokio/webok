import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { AuthRequestInterface } from '@webok/core/lib/auth'
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

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({ type: [UserDto] })
  async find (@Req() request: AuthRequestInterface): Promise<UserDto[]> {
    const userDto: UserDto | undefined = await this.userService.get(request.user.userId)
    if (!userDto) {
      return []
    }
    return [userDto]
  }
}
