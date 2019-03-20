import { ApiModelProperty } from '@nestjs/swagger'
import { IAuth, ICreateAuthData, IRefreshAuthData } from '@webok/core/lib/auth'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class Auth implements IAuth {
  @ApiModelProperty()
  readonly accessToken!: string

  @ApiModelProperty()
  readonly refreshToken!: string
}

export class CreateAuthData implements ICreateAuthData {
  @ApiModelProperty()
  @IsEmail()
  readonly email!: string

  @ApiModelProperty()
  @IsString()
  @MinLength(5)
  readonly password!: string
}

export class RefreshAuthData implements IRefreshAuthData {
  @ApiModelProperty()
  readonly refreshToken!: string
}

export interface AuthPayload {
  readonly userId: number
}
