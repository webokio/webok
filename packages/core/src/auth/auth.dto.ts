import { ApiModelProperty } from '@nestjs/swagger'

export interface AuthDtoOptions {
  readonly authId: number
  readonly accessToken: string
  readonly refreshToken: string
}

export class AuthDto {
  @ApiModelProperty()
  readonly authId: number

  @ApiModelProperty()
  readonly accessToken: string

  @ApiModelProperty()
  readonly refreshToken: string

  constructor (authDtoOptions: AuthDtoOptions) {
    const { authId, accessToken, refreshToken } = authDtoOptions
    this.authId = authId
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }

  // Special method to force DTO usage
  __isDto () {
    return true
  }
}
