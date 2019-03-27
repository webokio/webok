import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Inject } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthPayloadInterface } from '@webok/core/lib/auth'

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor (
    @Inject('config.auth.secretKey')
    private readonly secretKey: string,
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
