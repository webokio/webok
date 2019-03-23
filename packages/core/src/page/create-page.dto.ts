import { ApiModelProperty } from '@nestjs/swagger'

export class CreatePageDto {
  @ApiModelProperty()
  readonly name!: string

  @ApiModelProperty()
  readonly url!: string
}
