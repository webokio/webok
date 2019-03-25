import { ApiModelProperty } from '@nestjs/swagger'
import { IAuth, ICreateAuthData, IModifyAuthData } from '@webok/core/lib/auth'
import { IsString, IsEmail, MinLength } from '../common/validator'

export class Auth implements IAuth {
  @ApiModelProperty()
  readonly loginRecordId!: number

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

export class ModifyAuthData implements IModifyAuthData {
  @ApiModelProperty()
  @IsString()
  readonly refreshToken!: string
}

export interface AuthPayload {
  // We can check valid login record if needed.
  readonly loginRecordId: number
  readonly userId: number
}
