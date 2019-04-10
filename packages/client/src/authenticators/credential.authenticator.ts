import { AuthDto, CreateAuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'
import { AuthenticatorHelper } from './authenticator.helper'
import { AuthenticatorInterface } from './authenticator.interface'

export class CredentialAuthenticator implements AuthenticatorInterface {
  private readonly helper = new AuthenticatorHelper()
  private auth?: AuthDto

  constructor (private readonly createAuthDto: CreateAuthDto) {}

  async getAuth (axios: AxiosInstance): Promise<AuthDto> {
    if (!this.auth) {
      this.auth = (await axios.post<AuthDto>('/auth', this.createAuthDto)).data
    } else if (this.helper.shouldRefreshAuth(this.auth)) {
      const { authId, refreshToken } = this.auth
      try {
        this.auth = (await axios.post<AuthDto>(`/auth/${authId}`, { refreshToken })).data
      } catch (err) {
        this.auth = (await axios.post<AuthDto>('/auth', this.createAuthDto)).data
      }
    }
    return this.auth
  }
}
