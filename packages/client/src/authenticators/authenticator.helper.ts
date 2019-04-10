import { AuthDto } from '@webok/core/lib/auth'
import jwtDecode from 'jwt-decode'

export class AuthenticatorHelper {
  shouldRefreshAuth (auth: AuthDto): boolean {
    // Check if access token is already expired or will be expired soon (less than 1000 seconds)
    const { exp } = jwtDecode(auth.accessToken)
    return exp * 1000 - Date.now() < 1000
  }
}
