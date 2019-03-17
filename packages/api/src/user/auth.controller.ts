import { Controller, Inject, Post, Body, UnauthorizedException } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger'
import { IAuthService, Auth, LoginData } from '@webok/core/lib/auth'

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor (@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: Auth })
  @ApiResponse({status: 401, description: 'Error: Unauthorized'})
  async login (@Body() data: LoginData): Promise<Auth> {
    try {
      const auth = await this.authService.login(data)
      return auth
    } catch (err) {
      throw new UnauthorizedException()
    }
  }
}
