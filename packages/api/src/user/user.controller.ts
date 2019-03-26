import { Controller, Post, Body, Get, UseGuards, InternalServerErrorException, Req } from '@nestjs/common'
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
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
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({})
  async find (@Req() req: any): Promise<UserDto> {
    const userDto: UserDto | undefined = await this.userService.get(req.user)
    if (!userDto) {
      throw new InternalServerErrorException()
    }
    return userDto
  }
}
