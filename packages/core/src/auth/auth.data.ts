import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class LoginData {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password: string

  constructor (email: string, password: string) {
    this.email = email
    this.password = password
  }
}
