import { AxiosInstance } from 'axios'
import { IUserService, User, CreateUserData } from '@webok/core/lib/user'

export class UserClient implements IUserService {
  private readonly httpClient: AxiosInstance

  constructor (createHttpClient: (path: string) => AxiosInstance) {
    this.httpClient = createHttpClient('users')
  }

  async create (data: CreateUserData): Promise<User> {
    return (await this.httpClient.post<User>('/', data)).data
  }
}
