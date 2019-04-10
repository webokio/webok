import { AuthDto, CreateAuthDto } from '@webok/core/lib/auth'

export interface ClientOptions {
  auth?: AuthDto
  credentials?: CreateAuthDto
}
