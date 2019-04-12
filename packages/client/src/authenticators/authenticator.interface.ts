import { AxiosInstance } from 'axios'

export interface AuthenticatorInterface {
  getAccessToken (axios: AxiosInstance): Promise<string>
}
