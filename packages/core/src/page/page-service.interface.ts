import { PageDto } from './page.dto'
import { CreatePageDto } from './create-page.dto'
import { UpdatePageDto } from './update-page.dto'

export interface PageServiceInterface {
  find (): Promise<PageDto[]>
  create (createPageDto: CreatePageDto): Promise<PageDto>
  get (pageId: number): Promise<PageDto | undefined>
  update (pageId: number, updatePageDto: UpdatePageDto): Promise<PageDto | undefined>
  remove (pageId: number): Promise<PageDto | undefined>
}
