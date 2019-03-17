import { IBaseService } from '../common/base.interface'

export interface IPage {
  id: number
  name: string
  url: string
  createdAt: string
}

export interface ICreatePageData {
  readonly name: string
  readonly url: string
}

export interface IUpdatePageData {
  readonly name?: string
  readonly url?: string
}

export interface IPageService extends IBaseService<IPage, ICreatePageData, IUpdatePageData> {}
