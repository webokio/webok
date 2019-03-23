import { ApiModelProperty } from '@nestjs/swagger'

export class CreateAuthDto {
  @ApiModelProperty()
  readonly email!: string

  @ApiModelProperty()
  readonly password!: string
}
