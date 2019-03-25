import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, MinLength, IsUrl } from 'class-validator'

export class CreatePageDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(3)
  readonly name!: string

  @ApiModelProperty()
  @IsUrl()
  readonly url!: string
}
