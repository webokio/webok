import { ApiModelProperty } from '@nestjs/swagger'
import { IsString, IsUrl, MinLength } from 'class-validator'

export class CreatePageDto {
  @ApiModelProperty()
  @IsString()
  @MinLength(3)
  name: string = ''

  @ApiModelProperty()
  @IsUrl()
  url: string = ''
}
