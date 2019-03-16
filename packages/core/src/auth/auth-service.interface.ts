import { WithCreate } from '../common/base-service.interface'
import { CreateAuthData } from './auth.data'

export interface IAuthService extends WithCreate<String, CreateAuthData> {}
