import { ApiModelPropertyOptional } from '@nestjs/swagger'

export class UpdatePageDto {
  @ApiModelPropertyOptional()
  readonly name?: string

  @ApiModelPropertyOptional()
  readonly url?: string
}
