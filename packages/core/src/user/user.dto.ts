import { ApiModelProperty } from '@nestjs/swagger'

export interface UserDtoOptions {
  readonly id: number
  readonly name: string
  readonly email: string
}

export class UserDto {
  @ApiModelProperty()
  readonly id: number

  @ApiModelProperty()
  readonly name: string

  @ApiModelProperty()
  readonly email: string

  constructor (userDtoOptions: UserDtoOptions) {
    const { id, name, email } = userDtoOptions
    this.id = id
    this.name = name
    this.email = email
  }

  // Special method to force DTO usage
  __isDto () {
    return true
  }
}
