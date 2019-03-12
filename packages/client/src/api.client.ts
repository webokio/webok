import { UserClient } from './user'
import { PageClient } from './page'
import axios, { AxiosInstance } from 'axios'

export class ApiClient {
  readonly users: UserClient
  readonly pages: PageClient

  constructor (baseUrl: string) {
    const createHttpClient = (path: string): AxiosInstance => {
      return axios.create({
        baseURL: `${baseUrl}/${path}`,
      })
    }
    this.users = new UserClient(createHttpClient)
    this.pages = new PageClient(createHttpClient)
  }
}
