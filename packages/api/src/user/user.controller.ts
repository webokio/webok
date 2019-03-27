import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException, Req } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { UserDto, CreateUserDto } from '@webok/core/lib/user'
import { UserService } from '@webok/services/lib/user'
import { AuthPayloadInterface } from '@webok/core/lib/auth'

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
  @ApiOkResponse({ type: [UserDto] })
  async find (@Req() req: any): Promise<UserDto[]> {
    const authPayload = req.user as AuthPayloadInterface
    const userDto: UserDto | undefined = await this.userService.get(authPayload.userId)
    if (!userDto) {
      return []
    }
    return [userDto]
  }
}
