import { WithCreate } from '../common/base.interface'

export interface IAuth {
  readonly loginRecordId: number
  readonly accessToken: string
  readonly refreshToken: string
}

export interface ICreateAuthData {
  readonly email: string
  readonly password: string
}

export interface IModifyAuthData {
  readonly refreshToken: string
}

export interface IAuthService extends WithCreate<IAuth, ICreateAuthData> {
  refresh (id: number, data: IModifyAuthData): Promise<IAuth>
  remove (id: number, data: IModifyAuthData): Promise<void>
}

export interface IPasswordHelper {
  hashPassword (password: string): Promise<string>
  verifyPassword (password: string, passwordHash: string): Promise<boolean>
}
