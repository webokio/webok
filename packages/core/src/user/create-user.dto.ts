import { ApiModelProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiModelProperty()
  readonly name!: string

  @ApiModelProperty()
  readonly email!: string

  @ApiModelProperty()
  readonly password!: string
}
