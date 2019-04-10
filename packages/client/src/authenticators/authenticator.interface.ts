import { AuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'

export interface AuthenticatorInterface {
  getAuth (axios: AxiosInstance): Promise<AuthDto>
}
