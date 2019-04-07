import { Request } from 'express'
import { AuthPayloadInterface } from './auth-payload.interface'

export interface AuthRequestInterface extends Request {
  readonly user: AuthPayloadInterface
}
