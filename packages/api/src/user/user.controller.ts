import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger'
import { CreateUserDto, UserDto } from '@webok/core/lib/user'
import { UserService } from '@webok/services/lib/user'
import { UserId } from '../auth'

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
  async find (@UserId() userId: number): Promise<UserDto[]> {
    const userDto: UserDto | undefined = await this.userService.get(userId)
    if (!userDto) {
      return []
    }
    return [userDto]
  }
}
