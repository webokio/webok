import { Injectable } from '@nestjs/common'
import { PageDto } from '@webok/core/lib/page'
import { Page } from '@webok/models/lib/page'
import { UserDtoMapper } from '../user'

@Injectable()
export class PageDtoMapper {
  constructor (private readonly userDtoMapper: UserDtoMapper) {}

  fromPage (page: Page): PageDto {
    const { id, owner, name, url, createdAt } = page
    return new PageDto({ id, owner: this.userDtoMapper.fromUser(owner), name, url, createdAt })
  }
}
