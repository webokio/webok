import { AuthPayloadInterface } from '@webok/core/lib/auth'
import { Request } from 'express'

export interface RequestInterface extends Request {
  readonly user: AuthPayloadInterface
}
