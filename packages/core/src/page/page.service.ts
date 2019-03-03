import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNumberString, IsUrl, IsOptional } from 'class-validator'
import { Repository, InjectRepository } from '../common/service'
import { Optional } from '../common/optional'
import { Page } from './page.entity'

export class CreatePageData {
  @ApiModelProperty()
  @IsString()
  readonly name: string

  @ApiModelProperty()
  @IsUrl()
  readonly url: string

  constructor (name: string, url: string) {
    this.name = name
    this.url = url
  }
}

export class UpdatePageData {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsString() 
  readonly name?: string

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  readonly url?: string
}

export class ParamsWithId {
  @ApiModelProperty()
  @IsNumberString()
  readonly id: number

  constructor (id: number) {
    this.id = id
  }
}

export class PageService {
  constructor (
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  async find (): Promise<Page[]> {
    return this.pageRepository.find()
  }

  async get ({ id }: ParamsWithId): Promise<Optional<Page>> {
    const page = await this.pageRepository.findOne({ id })
    return Optional.ofNullable(page)
  }

  async create ({ name, url }: CreatePageData): Promise<Page> {
    return this.pageRepository.save(new Page(name, url))
  }

  async update (id: ParamsWithId, data: UpdatePageData): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      const page = await this.pageRepository.save({ ...optionalPage.get(), ...data })
      return Optional.ofNonNull(page)
    }
    return optionalPage
  }

  async remove (id: ParamsWithId): Promise<Optional<Page>> {
    const optionalPage = await this.get(id)
    if (optionalPage.isPresent()) {
      await this.pageRepository.remove(optionalPage.get())
    }
    return optionalPage
  }
}
