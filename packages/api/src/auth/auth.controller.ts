import { Controller, Inject, Post, Body, UnauthorizedException } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { IAuthService } from '@webok/core/lib/auth'
import { CreateAuthData, Auth } from '@webok/models/lib/auth'

@Controller('auth')
@ApiUseTags('Authentication')
export class AuthController {
  constructor (@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Post()
  @ApiCreatedResponse({ type: Auth })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async create (@Body() data: CreateAuthData): Promise<Auth> {
    try {
      const result: Auth = await this.authService.create(data)
      return result
    } catch (err) {
      throw new UnauthorizedException('Invalid email or password')
    }
  }
}
