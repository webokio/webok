import { ApiModelPropertyOptional } from '@nestjs/swagger'
import { IsString, MinLength, IsOptional, IsUrl } from 'class-validator'

export class UpdatePageDto {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  url?: string
}
