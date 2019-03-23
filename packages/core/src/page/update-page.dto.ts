import { ApiModelPropertyOptional } from '@nestjs/swagger'
import { IsString, MinLength, IsOptional, IsUrl } from 'class-validator'

export class UpdatePageDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  readonly name?: string

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly url?: string
}
