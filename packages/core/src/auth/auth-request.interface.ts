import { Request } from 'express'
import { AuthPayloadInterface } from './auth-payload.interface'

export interface AuthRequestInterface<P = any> extends Request {
  readonly user: AuthPayloadInterface
  readonly params: P
}
