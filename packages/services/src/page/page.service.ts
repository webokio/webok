import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IPageService } from '@webok/core/lib/page'
import { Page, PageRepository, CreatePageData, UpdatePageData } from '@webok/models/lib/page'

@Injectable()
export class PageService implements IPageService {
  constructor (
    @InjectRepository(PageRepository)
    private readonly pageRepository: PageRepository,
  ) {}

  async find (): Promise<Page[]> {
    return this.pageRepository.find()
  }

  async get (id: number): Promise<Page | undefined> {
    const page = await this.pageRepository.findOne({ id })
    return page
  }

  async create ({ name, url }: CreatePageData): Promise<Page> {
    return this.pageRepository.save(new Page({ name, url }))
  }

  async update (id: number, data: UpdatePageData): Promise<Page | undefined> {
    const page = await this.get(id)
    if (!page) {
      return page
    }
    if (typeof data.name !== 'undefined') {
      page.name = data.name
    }
    if (typeof data.url !== 'undefined') {
      page.url = data.url
    }
    return this.pageRepository.save(page)
  }

  async remove (id: number): Promise<void> {
    const page = await this.get(id)
    if (page) {
      await this.pageRepository.remove(page)
    }
  }
}
