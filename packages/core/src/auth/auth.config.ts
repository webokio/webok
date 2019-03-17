import { JwtModuleOptions } from '@nestjs/jwt'
import config from 'config'

interface JwtConfig {
  secretKey: string
  expiresIn: string
}

const jwtConfig = config.get<JwtConfig>('auth')

export const AuthConfig: JwtModuleOptions = {
  secretOrPrivateKey: jwtConfig.secretKey,
  signOptions: {
    expiresIn: jwtConfig.expiresIn,
  },
}
