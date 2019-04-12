import { AuthDto, CreateAuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'
import { AuthenticatorHelper } from './authenticator.helper'
import { AuthenticatorInterface } from './authenticator.interface'

export class CredentialAuthenticator implements AuthenticatorInterface {
  private readonly helper = new AuthenticatorHelper()
  private auth?: AuthDto

  constructor (private readonly createAuthDto: CreateAuthDto) {}

  async getAccessToken (axios: AxiosInstance): Promise<string> {
    if (!this.auth) {
      this.auth = (await axios.post<AuthDto>('/auth', this.createAuthDto)).data
    } else if (this.helper.shouldRefreshAuth(this.auth)) {
      try {
        this.auth = await this.helper.refreshAuth(axios, this.auth)
      } catch (err) {
        this.auth = (await axios.post<AuthDto>('/auth', this.createAuthDto)).data
      }
    }
    return this.auth.accessToken
  }
}
