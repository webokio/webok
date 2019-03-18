import { Controller, Inject, Post, Body, UnauthorizedException } from '@nestjs/common'
import { ApiUseTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger'
import { IAuthService } from '@webok/core/lib/user'
import { LoginData, LoginResult } from '@webok/models/lib/user'

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  constructor (@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResult })
  @ApiResponse({ status: 401 })
  async login (@Body() data: LoginData): Promise<LoginResult> {
    try {
      const result: LoginResult = await this.authService.login(data)
      return result
    } catch (err) {
      throw new UnauthorizedException('Invalid email or password')
    }
  }
}
