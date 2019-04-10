import { AuthDto } from '@webok/core/lib/auth'
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import jwtDecode from 'jwt-decode'
import { ClientOptions } from './client-options'

export class BaseClient {
  auth?: AuthDto

  constructor (private readonly axios: AxiosInstance, private readonly options: ClientOptions) {}

  async get<T = any> (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.get<T>(url, await this.createAuthConfig(config))
  }

  async post<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.post<T>(url, data, await this.createAuthConfig(config))
  }

  async patch<T = any> (url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axios.patch<T>(url, data, await this.createAuthConfig(config))
  }

  async delete (url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
    return this.axios.delete(url, await this.createAuthConfig(config))
  }

  private async createAuthConfig (config: AxiosRequestConfig = {}): Promise<AxiosRequestConfig> {
    const authConfig: AxiosRequestConfig = { ...config }
    // Create authentication if not exists
    if (!this.auth) {
      if (this.options.auth) {
        this.auth = this.options.auth
      } else if (this.options.credentials) {
        this.auth = (await this.axios.post<AuthDto>('/auth', this.options.credentials)).data
      } else {
        throw new Error(`'auth' or 'credentials' must be provided`)
      }
    }
    // Refresh authentication if expired in 1000 seconds
    const { exp } = jwtDecode(this.auth.accessToken)
    if (exp * 1000 - Date.now() < 1000) {
      const { authId, refreshToken } = this.auth
      try {
        this.auth = (await this.axios.post<AuthDto>(`/auth/${authId}`, { refreshToken })).data
      } catch (err) {
        if (this.options.credentials) {
          this.auth = (await this.axios.post<AuthDto>('/auth', this.options.credentials)).data
        } else {
          throw new Error('Failed to refresh authentication')
        }
      }
    }
    // Set authentication header
    authConfig.headers = {
      ...authConfig.headers,
      Authorization: `Bearer ${this.auth.accessToken}`,
    }
    return authConfig
  }
}
