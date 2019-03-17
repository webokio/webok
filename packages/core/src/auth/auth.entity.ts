import { ApiModelProperty } from '@nestjs/swagger'

export class Auth {
  @ApiModelProperty()
  token: string

  constructor (token: string) {
    this.token = token
  }
}
