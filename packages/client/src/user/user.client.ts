import { CreateUserDto, UserDto } from '@webok/core/lib/user'
import { AxiosInstance, AxiosResponse } from 'axios'

export class UserClient {
  private readonly basePath = 'users'

  constructor (private readonly baseClient: AxiosInstance) {}

  create (createUserDto: CreateUserDto): Promise<AxiosResponse<UserDto>> {
    return this.baseClient.post<UserDto>(this.basePath, createUserDto)
  }

  find (): Promise<AxiosResponse<UserDto[]>> {
    return this.baseClient.get<UserDto[]>(this.basePath)
  }
}
