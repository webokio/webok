import { ApiModelPropertyOptional } from '@nestjs/swagger'
import { IsIn, IsNumberString } from 'class-validator'

export class FindPagesDto {
  @ApiModelPropertyOptional()
  @IsNumberString()
  skip?: number

  @ApiModelPropertyOptional()
  @IsNumberString()
  take?: number

  @ApiModelPropertyOptional()
  @IsIn(['name', 'url', 'createdAt'])
  sort?: string

  @ApiModelPropertyOptional()
  @IsIn(['ASC', 'DESC'])
  dir?: 'ASC' | 'DESC'
}
