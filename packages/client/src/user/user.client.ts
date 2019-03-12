import { AxiosInstance } from 'axios'
import { IUserService, User, CreateUserData } from '@webok/core/lib/user'
import { create } from '../common/base.client'

export class UserClient implements IUserService {
  private readonly httpClient: AxiosInstance

  constructor (createHttpClient: (path: string) => AxiosInstance) {
    this.httpClient = createHttpClient('users')
  }

  create (data: CreateUserData): Promise<User> {
    return create(this.httpClient, data)
  }
}
