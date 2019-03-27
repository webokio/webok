import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import config from 'config'
import { AuthPayloadInterface } from '@webok/core/lib/auth'

interface AuthConfig {
  secretKey: string
}

const authConfig: AuthConfig = config.get<AuthConfig>('auth')

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.secretKey,
    })
  }

  validate (payload: AuthPayloadInterface) {
    return payload.userId
  }
}
