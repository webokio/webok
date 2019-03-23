import { ApiModelProperty } from '@nestjs/swagger'

export class PageDto {
  @ApiModelProperty()
  readonly id!: number

  @ApiModelProperty()
  readonly name!: string

  @ApiModelProperty()
  readonly url!: string

  @ApiModelProperty()
  readonly createdAt!: string
}
