import { Controller, HttpCode, HttpStatus, Post, Delete, Body, Param, UnauthorizedException } from '@nestjs/common'
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiModelProperty,
} from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'
import { AuthDto, CreateAuthDto, ModifyAuthDto } from '@webok/core/lib/auth'
import { AuthService } from '@webok/services/lib/auth'

class AuthIdParam {
  @ApiModelProperty()
  @IsNumberString()
  readonly authId!: number
}

@Controller('auth')
@ApiUseTags('Authentication')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async create (@Body() createAuthDto: CreateAuthDto): Promise<AuthDto> {
    try {
      const authDto: AuthDto = await this.authService.create(createAuthDto)
      return authDto
    } catch (err) {
      throw new UnauthorizedException('Invalid email or password')
    }
  }

  @Post(':authId/refresh')
  @ApiCreatedResponse({ type: AuthDto })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async refresh (@Param() { authId }: AuthIdParam, @Body() modifyAuthDto: ModifyAuthDto): Promise<AuthDto> {
    try {
      const authDto: AuthDto = await this.authService.refresh(authId, modifyAuthDto)
      return authDto
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh data')
    }
  }

  @Delete(':authId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() { authId }: AuthIdParam, @Body() modifyAuthDto: ModifyAuthDto): Promise<void> {
    await this.authService.remove(authId, modifyAuthDto)
  }
}
