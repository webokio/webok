import { Injectable } from '@nestjs/common'
import { PageDto } from '@webok/core/lib/page'
import { Page } from '@webok/models/lib/page'

@Injectable()
export class PageDtoMapper {
  fromPage (page: Page): PageDto {
    const { id, name, url, createdAt } = page
    return new PageDto({ id, name, url, createdAt })
  }
}
