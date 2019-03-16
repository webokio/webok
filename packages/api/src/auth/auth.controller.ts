import { Controller, Inject, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common'
import { ApiUseTags, ApiCreatedResponse, ApiBadRequestResponse } from '@nestjs/swagger'
import { IAuthService, CreateAuthData } from '@webok/core/lib/auth'

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiUseTags('Auth')
export class AuthController {
  constructor (@Inject('IAuthService') private readonly authService: IAuthService) {}

  @Post('login')
  @ApiCreatedResponse({ type: String })
  @ApiBadRequestResponse({})
  create (@Body() data: CreateAuthData): Promise<String> {
    return this.authService.create(data)
  }
}
