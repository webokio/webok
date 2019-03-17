import { AxiosInstance } from 'axios'
import { IUserService, IUser, ICreateUserData } from '@webok/core/lib/user'
import { create } from '../common/base.client'

export class UserClient implements IUserService {
  private readonly httpClient: AxiosInstance

  constructor (createHttpClient: (path: string) => AxiosInstance) {
    this.httpClient = createHttpClient('users')
  }

  create (data: ICreateUserData): Promise<IUser> {
    return create(this.httpClient, data)
  }
}
