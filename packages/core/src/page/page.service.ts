import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Optional } from 'typescript-optional'
import { Page } from './page.entity'

export interface CreatePageData {
  readonly name: string
  readonly url: string
}

export interface UpdatePageData {
  readonly name?: string
  readonly url?: string
}

export class PageService {
  constructor (
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async find (): Promise<Page[]> {
    return this.pageRepository.find()
  }

  async get (id: number): Promise<Optional<Page>> {
    const page = await this.pageRepository.findOne({ id })
    return Optional.ofNullable(page)
  }

  async create (data: CreatePageData): Promise<Page> {
    return this.pageRepository.save(data)
  }

  async update (id: number, data: UpdatePageData): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pageRepository.update({ id }, data)
      return Optional.ofNonNull(Object.assign(optionalPage.get(), data))
    }
    return optionalPage
  }

  async remove (id: number): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pageRepository.remove(optionalPage.get())
    }
    return optionalPage
  }
}
