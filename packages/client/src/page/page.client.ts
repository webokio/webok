import { AxiosInstance } from 'axios'
import { IPageService, IPage, ICreatePageData, IUpdatePageData } from '@webok/core/lib/page'
import { BaseClient } from '../common/base.client'

export class PageClient extends BaseClient<IPage, ICreatePageData, IUpdatePageData> implements IPageService {
  constructor (createHttpClient: (path: string) => AxiosInstance) {
    super(createHttpClient, 'pages')
  }
}
