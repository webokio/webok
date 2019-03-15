import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class CreateUserData {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsEmail()
  readonly email: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password: string

  constructor (name: string, email: string, password: string) {
    this.name = name
    this.email = email
    this.password = password
  }
}
