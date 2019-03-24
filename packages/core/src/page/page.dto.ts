import { ApiModelProperty } from '@nestjs/swagger'

export interface PageDtoOptions {
  readonly id: number
  readonly name: string
  readonly url: string
  readonly createdAt: string
}

export class PageDto {
  @ApiModelProperty()
  readonly id: number

  @ApiModelProperty()
  readonly name: string

  @ApiModelProperty()
  readonly url: string

  @ApiModelProperty()
  readonly createdAt: string

  // A special field to force DTO usage
  private readonly isDto = true

  constructor (pageDtoOptions: PageDtoOptions) {
    const { id, name, url, createdAt } = pageDtoOptions
    this.id = id
    this.name = name
    this.url = url
    this.createdAt = createdAt
  }
}
