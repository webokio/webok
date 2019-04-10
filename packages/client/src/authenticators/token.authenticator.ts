import { AuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'
import { AuthenticatorHelper } from './authenticator.helper'
import { AuthenticatorInterface } from './authenticator.interface'

export class TokenAuthenticator implements AuthenticatorInterface {
  private readonly helper = new AuthenticatorHelper()

  constructor (private auth: AuthDto) {}

  async getAuth (axios: AxiosInstance): Promise<AuthDto> {
    if (this.helper.shouldRefreshAuth(this.auth)) {
      const { authId, refreshToken } = this.auth
      this.auth = (await axios.post<AuthDto>(`/auth/${authId}/refresh`, { refreshToken })).data
    }
    return this.auth
  }
}
