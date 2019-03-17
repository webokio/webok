import { LoginData } from './auth.data'
import { Auth } from './auth.entity'

export interface IAuthService {
  login (data: LoginData): Promise<Auth>
}
