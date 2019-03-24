import { AxiosInstance, AxiosResponse } from 'axios'
import { PageDto, CreatePageDto, UpdatePageDto } from '@webok/core/lib/page'

export class PageClient {
  private readonly basePath = 'pages'

  constructor (private readonly baseClient: AxiosInstance) {}

  find (): Promise<AxiosResponse<PageDto[]>> {
    return this.baseClient.get<PageDto[]>(this.basePath)
  }

  create (createPageDto: CreatePageDto): Promise<AxiosResponse<PageDto>> {
    return this.baseClient.post<PageDto>(this.basePath, createPageDto)
  }

  get (pageId: number): Promise<AxiosResponse<PageDto>> {
    return this.baseClient.get<PageDto>(`${this.basePath}/${pageId}`)
  }

  update (pageId: number, updatePageDto: UpdatePageDto): Promise<AxiosResponse<PageDto>> {
    return this.baseClient.patch<PageDto>(`${this.basePath}/${pageId}`, updatePageDto)
  }

  remove (pageId: number): Promise<AxiosResponse<void>> {
    return this.baseClient.delete(`${this.basePath}/${pageId}`)
  }
}
