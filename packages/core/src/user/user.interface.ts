import { WithCreate } from '../common/base.interface'

export interface IUser {
  id: number
  name: string
  email: string
}

export interface ICreateUserData {
  readonly name: string
  readonly email: string
  readonly password: string
}

export interface IPasswordHelper {
  hashPassword (password: string): Promise<string>
  verifyPassword (password: string, passwordHash: string): Promise<boolean>
}

export interface IUserService extends WithCreate<IUser, ICreateUserData> {}
