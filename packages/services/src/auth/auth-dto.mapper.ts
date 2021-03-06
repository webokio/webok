import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthDto, AuthPayloadInterface } from '@webok/core/lib/auth'
import { LoginRecord } from '@webok/models/lib/auth'

@Injectable()
export class AuthDtoMapper {
  constructor (private readonly jwtService: JwtService) {}

  fromLoginRecord (loginRecord: LoginRecord, refreshToken: string): AuthDto {
    const payload: AuthPayloadInterface = { authId: loginRecord.id, userId: loginRecord.user.id }
    return new AuthDto({
      authId: loginRecord.id,
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    })
  }
}
