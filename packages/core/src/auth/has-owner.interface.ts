import { UserDto } from '../user'

export interface HasOwnerInterface {
  readonly owner: UserDto
}
