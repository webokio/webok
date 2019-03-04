import { ApiModelProperty } from '@nestjs/swagger'
import { IsNumberString } from 'class-validator'

export class ParamsWithId {
  @ApiModelProperty()
  @IsNumberString()
  readonly id: number

  constructor (id: number) {
    this.id = id
  }
}
