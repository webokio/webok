import shortid from 'shortid'
import { Optional } from 'typescript-optional'
import { Page, CreatePageData, UpdatePageData } from './pages.interface'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

class PageService {
  constructor (
    @InjectRepository(Page)
    private readonly pages: Repository<Page>,
  ) {}

  async findAll (): Promise<Page[]> {
    return this.pages.find()
  }

  async get (id: string): Promise<Optional<Page>> {
    const page = await this.pages.findOne({ id })
    return Optional.ofNullable(page)
  }

  async create (data: CreatePageData): Promise<Page> {
    const page = { id: shortid.generate(), ...data }
    return this.pages.save(page)
  }

  async update (id: string, data: UpdatePageData): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pages.update({ id }, data)
      return Optional.ofNonNull(Object.assign(optionalPage.get(), data))
    }
    return optionalPage
  }

  async remove (id: string): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pages.remove(optionalPage.get())
    }
    return optionalPage
  }
}

export { PageService }
