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

  // A special field to force DTO usage
  private readonly isDto = true

  constructor(authDtoOptions: AuthDtoOptions) {
    const { authId, accessToken, refreshToken } = authDtoOptions
    this.authId = authId
    this.accessToken = accessToken
    this.refreshToken = refreshToken
  }
}
