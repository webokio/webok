import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsEmail } from '../common/validator'

export class CreateUserData {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsEmail()
  readonly email: string

  @ApiModelProperty()
  readonly password: string

  constructor (name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}
