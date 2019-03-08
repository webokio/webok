import { Repository, InjectRepository } from '../common/service'
import { Optional } from '../common/optional'
import { Page } from './page.entity'
import { CreatePageData, UpdatePageData } from './page.data'

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

  async remove (id: number): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pageRepository.remove(optionalPage.get())
    }
    return optionalPage
  }
}
