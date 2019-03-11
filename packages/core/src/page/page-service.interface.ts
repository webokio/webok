import { IBaseService } from '../common/base-service.interface'
import { Page } from './page.entity'
import { CreatePageData, UpdatePageData } from './page.data'

export interface IPageService extends IBaseService<Page, CreatePageData, UpdatePageData> {}
