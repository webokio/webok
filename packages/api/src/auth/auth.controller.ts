import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Delete,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ApiUseTags,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { IAuthService } from '@webok/core/lib/auth'
import { Auth, CreateAuthData, ModifyAuthData } from '@webok/models/lib/auth'
import { ParamsWithId } from '../common/params.data'

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
      const auth: Auth = await this.authService.create(data)
      return auth
    } catch (err) {
      throw new UnauthorizedException('Invalid email or password')
    }
  }

  @Post(':id/refresh')
  @ApiCreatedResponse({ type: Auth })
  @ApiBadRequestResponse({})
  @ApiUnauthorizedResponse({})
  async refresh (@Param() { id }: ParamsWithId, @Body() data: ModifyAuthData): Promise<Auth> {
    try {
      const auth: Auth = await this.authService.refresh(id, data)
      return auth
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh data')
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({})
  @ApiBadRequestResponse({})
  async remove (@Param() { id }: ParamsWithId, @Body() data: ModifyAuthData): Promise<void> {
    await this.authService.remove(id, data)
  }
}
