import { WithCreate } from '../common/base.interface'

export interface IAuth {
  readonly accessToken: string
  readonly refreshToken: string
}

export interface ICreateAuthData {
  readonly email: string
  readonly password: string
}

export interface IRefreshAuthData {
  readonly refreshToken: string
}

export interface IAuthService extends WithCreate<IAuth, ICreateAuthData> {
  refresh (data: IRefreshAuthData): Promise<IAuth>
}

export interface IPasswordHelper {
  hashPassword (password: string): Promise<string>
  verifyPassword (password: string, passwordHash: string): Promise<boolean>
}
