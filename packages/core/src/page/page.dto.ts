import { ApiModelProperty } from '@nestjs/swagger'
import { HasOwnerInterface } from '../auth'
import { UserDto } from '../user'

export interface PageDtoOptions {
  readonly id: number
  readonly owner: UserDto
  readonly name: string
  readonly url: string
  readonly createdAt: string
}

export class PageDto implements HasOwnerInterface {
  @ApiModelProperty()
  readonly id: number

  @ApiModelProperty()
  readonly owner: UserDto

  @ApiModelProperty()
  readonly name: string

  @ApiModelProperty()
  readonly url: string

  @ApiModelProperty()
  readonly createdAt: string

  constructor (pageDtoOptions: PageDtoOptions) {
    const { id, owner, name, url, createdAt } = pageDtoOptions
    this.id = id
    this.owner = owner
    this.name = name
    this.url = url
    this.createdAt = createdAt
  }

  // Special method to force DTO usage
  __isDto () {
    return true
  }
}
