import { AxiosInstance } from 'axios'
import { IPageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'
import { BaseClient } from '../common/base.client'

export class PageClient extends BaseClient<Page, CreatePageData, UpdatePageData> implements IPageService {
  constructor (createHttpClient: (path: string) => AxiosInstance) {
    super(createHttpClient, 'pages')
  }
}
