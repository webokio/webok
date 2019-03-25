import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/lib/page'
import { Page, PageRepository } from '@webok/models/lib/page'
import { nowAsString } from '@webok/helpers/lib/datetime.helper'
import { PageDtoMapper } from './page-dto.mapper'

@Injectable()
export class PageService {
  constructor (
    @InjectRepository(PageRepository)
    private readonly pageRepository: PageRepository,
    private readonly pageDtoMapper: PageDtoMapper,
  ) {}

  async find (): Promise<PageDto[]> {
    const pages: Page[] = await this.pageRepository.find()
    return pages.map(this.pageDtoMapper.fromPage)
  }

  async create (createPageDto: CreatePageDto): Promise<PageDto> {
    const { name, url } = createPageDto
    const page: Page = await this.pageRepository.save(new Page({ name, url, createdAt: nowAsString() }))
    return this.pageDtoMapper.fromPage(page)
  }

  async get (pageId: number): Promise<PageDto | undefined> {
    const page: Page | undefined = await this.pageRepository.findOne({ id: pageId })
    if (!page) {
      return
    }
    return this.pageDtoMapper.fromPage(page)
  }

  async update (pageId: number, updatePageDto: UpdatePageDto): Promise<PageDto | undefined> {
    const pageToUpdate: Page | undefined = await this.pageRepository.findOne({ id: pageId })
    if (!pageToUpdate) {
      return
    }
    const { name, url } = updatePageDto
    if (typeof name !== 'undefined') {
      pageToUpdate.name = name
    }
    if (typeof url !== 'undefined') {
      pageToUpdate.url = url
    }
    const page: Page = await this.pageRepository.save(pageToUpdate)
    if (!page) {
      return
    }
    return this.pageDtoMapper.fromPage(page)
  }

  async remove (pageId: number): Promise<PageDto | undefined> {
    const pageToRemove: Page | undefined = await this.pageRepository.findOne({ id: pageId })
    if (!pageToRemove) {
      return
    }
    await this.pageRepository.remove(pageToRemove)
    return this.pageDtoMapper.fromPage(pageToRemove)
  }
}
