import axios from 'axios'
import { PageClient } from './page'
import { UserClient } from './user'

export class ApiClient {
  readonly users: UserClient
  readonly pages: PageClient

  constructor (baseUrl: string) {
    const baseClient = axios.create({ baseURL: baseUrl })
    this.users = new UserClient(baseClient)
    this.pages = new PageClient(baseClient)
  }
}
