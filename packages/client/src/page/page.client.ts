import { AxiosInstance } from 'axios'
import { Optional } from '@webok/core/lib/common/optional'
import { IPageService, Page, CreatePageData, UpdatePageData } from '@webok/core/lib/page'

export class PageClient implements IPageService {
  private readonly httpClient: AxiosInstance

  constructor (createHttpClient: (path: string) => AxiosInstance) {
    this.httpClient = createHttpClient('pages')
  }

  async find (): Promise<Page[]> {
    return (await this.httpClient.get<Page[]>('/')).data
  }

  async get (id: number): Promise<Optional<Page>> {
    try {
      const page = (await this.httpClient.get<Page>(`/${id}`)).data
      return Optional.ofNonNull(page)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return Optional.empty()
      }
      throw err
    }
  }

  async create (data: CreatePageData): Promise<Page> {
    return (await this.httpClient.post<Page>('/', data)).data
  }

  async update (id: number, data: UpdatePageData): Promise<Optional<Page>> {
    try {
      const page = (await this.httpClient.patch<Page>(`/${id}`, data)).data
      return Optional.ofNonNull(page)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return Optional.empty()
      }
      throw err
    }
  }

  async remove (id: number): Promise<void> {
    await this.httpClient.delete(`/${id}`)
  }
}
