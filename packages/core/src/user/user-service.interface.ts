import { UserDto } from './user.dto'
import { CreateUserDto } from './create-user.dto'

export interface UserServiceInterface {
  create (createUserDto: CreateUserDto): Promise<UserDto>
}
