import { JwtModuleOptions } from '@nestjs/jwt'
import config from 'config'

export const AuthConfig: JwtModuleOptions = {
  ...config.get<JwtModuleOptions>('auth'),
}
