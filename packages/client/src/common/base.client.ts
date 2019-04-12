import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthenticatorInterface } from '../authenticators'

export class BaseClient {
  constructor (private readonly axios: AxiosInstance, private readonly authenticator?: AuthenticatorInterface) {}

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
    if (!this.authenticator) {
      return config
    }
    const accessToken: string = await this.authenticator.getAccessToken(this.axios)
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }
}
