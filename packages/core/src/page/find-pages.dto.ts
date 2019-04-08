import { ApiModelProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class FindPagesDto {
  @ApiModelProperty()
  @IsNumber()
  readonly ownerId?: number
}
