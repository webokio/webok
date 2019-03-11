import { User } from './user.entity'
import { CreateUserData } from './user.data'

export interface IUserService {
  create (data: CreateUserData): Promise<User>
}
