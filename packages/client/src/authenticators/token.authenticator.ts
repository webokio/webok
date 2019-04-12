import { AuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'
import { AuthenticatorHelper } from './authenticator.helper'
import { AuthenticatorInterface } from './authenticator.interface'

export class TokenAuthenticator implements AuthenticatorInterface {
  private readonly helper = new AuthenticatorHelper()

  constructor (private auth: AuthDto) {}

  async getAccessToken (axios: AxiosInstance): Promise<string> {
    if (this.helper.shouldRefreshAuth(this.auth)) {
      this.auth = await this.helper.refreshAuth(axios, this.auth)
    }
    return this.auth.accessToken
  }
}
