import { Controller, Inject, Post, Body, BadRequestException } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IAuthService, Auth, LoginData } from '@webok/core/lib/auth'

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor (@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: Auth })
  @ApiBadRequestResponse({})
  async login (@Body() data: LoginData): Promise<Auth> {
    try {
      const auth = await this.authService.login(data)
      return auth
    } catch (err) {
      throw new BadRequestException()
    }
  }
}
