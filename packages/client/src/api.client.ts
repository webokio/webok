import axios from 'axios'
import { AuthenticatorInterface } from './authenticators'
import { BaseClient } from './common'
import { PageClient } from './page'
import { UserClient } from './user'

export class ApiClient {
  readonly users: UserClient
  readonly pages: PageClient

  constructor (baseUrl: string, authenticator?: AuthenticatorInterface) {
    const baseClient = new BaseClient(axios.create({ baseURL: baseUrl }), authenticator)
    this.users = new UserClient(baseClient)
    this.pages = new PageClient(baseClient)
  }
}
