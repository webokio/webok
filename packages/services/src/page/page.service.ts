import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindConditions } from 'typeorm'
import { PageDto, CreatePageDto, UpdatePageDto, FindPagesDto } from '@webok/core/lib/page'
import { Page, PageRepository } from '@webok/models/lib/page'
import { User, UserRepository } from '@webok/models/lib/user'
import { nowAsString } from '@webok/helpers/lib/datetime.helper'
import { PageDtoMapper } from './page-dto.mapper'

@Injectable()
export class PageService {
  constructor (
    @InjectRepository(PageRepository)
    private readonly pageRepository: PageRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly pageDtoMapper: PageDtoMapper,
  ) {}

  async find (findPagesDto: FindPagesDto): Promise<PageDto[]> {
    // TODO add pagination to FindPagesDto
    const query: FindConditions<Page> = {}
    if (findPagesDto) {
      if (findPagesDto.ownerId) {
        query.owner = await this.userRepository.findOne({ id: findPagesDto.ownerId })
      }
    }
    const pages: Page[] = await this.pageRepository.find({ where: query })
    return pages.map(this.pageDtoMapper.fromPage)
  }

  async create (createPageDto: CreatePageDto, ownerId: number): Promise<PageDto> {
    const owner: User | undefined = await this.userRepository.findOne({ id: ownerId })
    if (!owner) {
      throw new Error('User not found')
    }
    const { name, url } = createPageDto
    const page: Page = await this.pageRepository.save(new Page({ owner, name, url, createdAt: nowAsString() }))
    return this.pageDtoMapper.fromPage(page)
  }

  async get (pageId: number): Promise<PageDto | undefined> {
    const page: Page | undefined = await this.pageRepository.findOne({ where: { id: pageId } })
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
