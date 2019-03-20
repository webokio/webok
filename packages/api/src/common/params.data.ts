import { ApiModelProperty } from '@nestjs/swagger'
import { IsNumberString } from '@webok/models/lib/common/validator'

export class ParamsWithId {
  @ApiModelProperty()
  @IsNumberString()
  readonly id: number

  constructor (id: number) {
    this.id = id
  }
}
