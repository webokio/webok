import { Optional } from '../common/optional'
import { Page } from './page.entity'
import { CreatePageData, UpdatePageData } from './page.data'

export interface IPageService {
  find (): Promise<Page[]>
  get (id: number): Promise<Optional<Page>>
  create (data: CreatePageData): Promise<Page>
  update (id: number, data: UpdatePageData): Promise<Optional<Page>>
  remove (id: number): Promise<void>
}
