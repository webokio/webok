import { ApiModelProperty } from '@nestjs/swagger'
import { ILoginData, ILoginResult } from '@webok/core/lib/user'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class LoginData implements ILoginData {
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

export class LoginResult implements ILoginResult {
  @ApiModelProperty()
  readonly accessToken: string

  constructor (accessToken: string) {
    this.accessToken = accessToken
  }
}

export interface AuthPayload {
  readonly userId: number
}
