import { ApiModelProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ModifyAuthDto {
  @ApiModelProperty()
  @IsString()
  readonly refreshToken!: string
}
