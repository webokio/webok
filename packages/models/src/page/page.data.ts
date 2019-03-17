import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { ICreatePageData, IUpdatePageData } from '@webok/core/lib/page'
import { IsString, IsUrl, IsOptional } from '../common/validator'

export class CreatePageData implements ICreatePageData {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsUrl()
  readonly url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

export class UpdatePageData implements IUpdatePageData {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString()
  readonly name?: string

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly url?: string
}
