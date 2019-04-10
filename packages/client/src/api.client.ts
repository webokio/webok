import axios from 'axios'
import { BaseClient, ClientOptions } from './common'
import { PageClient } from './page'
import { UserClient } from './user'

export class ApiClient {
  readonly users: UserClient
  readonly pages: PageClient

  constructor (baseUrl: string, options: ClientOptions) {
    const baseClient = new BaseClient(axios.create({ baseURL: baseUrl }), options)
    this.users = new UserClient(baseClient)
    this.pages = new PageClient(baseClient)
  }
}
