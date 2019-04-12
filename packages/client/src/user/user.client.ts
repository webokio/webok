import { CreateUserDto, UserDto } from '@webok/core/lib/user'
import { AxiosResponse } from 'axios'
import { BaseClient } from '../common'

export class UserClient {
  private readonly basePath = 'users'

  constructor (private readonly baseClient: BaseClient) {}

  getCurrentUser (): Promise<AxiosResponse<UserDto>> {
    return this.baseClient.get<UserDto>(`${this.basePath}/me`)
  }

  create (createUserDto: CreateUserDto): Promise<AxiosResponse<UserDto>> {
    return this.baseClient.post<UserDto>(this.basePath, createUserDto)
  }
}
