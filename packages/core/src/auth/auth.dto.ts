import { ApiModelProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiModelProperty()
  readonly id!: number

  @ApiModelProperty()
  readonly accessToken!: string

  @ApiModelProperty()
  readonly refreshToken!: string
}
