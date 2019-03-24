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

  // A special field to force DTO usage
  private readonly isDto = true

  constructor (userDtoOptions: UserDtoOptions) {
    const { id, name, email } = userDtoOptions
    this.id = id
    this.name = name
    this.email = email
  }
}
