import { WithCreate } from '../common/base-service.interface'
import { User } from './user.entity'
import { CreateUserData } from './user.data'

export interface IUserService extends WithCreate<User, CreateUserData> {}
