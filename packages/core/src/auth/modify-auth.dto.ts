import { ApiModelProperty } from '@nestjs/swagger'

export class ModifyAuthDto {
  @ApiModelProperty()
  readonly refreshToken!: string
}
