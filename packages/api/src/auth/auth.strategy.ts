import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthPayloadInterface } from '@webok/core/lib/auth'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject('config.auth.secretKey')
    secretKey: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
    })
  }

  validate (payload: AuthPayloadInterface) {
    return payload
  }
}
