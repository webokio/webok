import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Optional } from '@webok/core/lib/common/optional'
import { IPageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'
import { PageRepository } from './page.repository'

@Injectable()
export class PageService implements IPageService {
  constructor (
    @InjectRepository(PageRepository)
    private readonly pageRepository: PageRepository,
  ) {}

  async find (): Promise<Page[]> {
    return this.pageRepository.find()
  }

  async get (id: number): Promise<Optional<Page>> {
    const page = await this.pageRepository.findOne({ id })
    return Optional.ofNullable(page)
  }

  async create ({ name, url }: CreatePageData): Promise<Page> {
    return this.pageRepository.save(new Page(name, url))
  }

  async update (id: number, data: UpdatePageData): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isEmpty) {
      return optionalPage
    }
    const page = optionalPage.get()
    if (typeof data.name !== 'undefined') {
      page.name = data.name
    }
    if (typeof data.url !== 'undefined') {
      page.url = data.url
    }
    return Optional.ofNonNull(await this.pageRepository.save(page))
  }

  async remove (id: number): Promise<void> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pageRepository.remove(optionalPage.get())
    }
  }
}
