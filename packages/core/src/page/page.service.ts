import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { Repository, InjectRepository } from '../common/service'
import { Optional } from '../common/optional'
import { Page } from './page.entity'

export class CreatePageData {
  @ApiModelProperty()
  readonly name: string

  @ApiModelProperty()
  readonly url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

export class UpdatePageData {
  @ApiModelPropertyOptional()
  readonly name?: string

  @ApiModelPropertyOptional()
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

  async create ({ name, url }: CreatePageData): Promise<Page> {
    return this.pageRepository.save(new Page(name, url))
  }

  async update (id: number, data: UpdatePageData): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      const page = await this.pageRepository.save({ ...optionalPage.get(), ...data })
      return Optional.ofNonNull(page)
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
