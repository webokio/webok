import { AuthDto, ModifyAuthDto } from '@webok/core/lib/auth'
import { AxiosInstance } from 'axios'
import jwtDecode from 'jwt-decode'

export class AuthenticatorHelper {
  shouldRefreshAuth (auth: AuthDto): boolean {
    // Check if access token is already expired or will be expired soon (less than 1000 seconds)
    const { exp } = jwtDecode(auth.accessToken)
    return exp * 1000 - Date.now() < 1000
  }

  async refreshAuth (axios: AxiosInstance, auth: AuthDto): Promise<AuthDto> {
    const { authId, refreshToken } = auth
    const refreshData: ModifyAuthDto = { refreshToken }
    return (await axios.post<AuthDto>(`/auth/${authId}/refresh`, refreshData)).data
  }
}
