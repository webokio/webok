import { Injectable } from '@nestjs/common'
import { UserDto } from '@webok/core/lib/user'
import { User } from '@webok/models/lib/user'

@Injectable()
export class UserDtoMapper {
  fromUser (user: User): UserDto {
    const { id, name, email } = user
    return new UserDto({ id, name, email })
  }
}
