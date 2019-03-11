import { ApiModelProperty } from '@nestjs/swagger'
import { IsNumberString } from '@webok/core/lib/common/validator'

export class ParamsWithId {
  @ApiModelProperty()
  @IsNumberString()
  readonly id: number

  constructor (id: number) {
    this.id = id
  }
}