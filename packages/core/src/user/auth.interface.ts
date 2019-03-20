export interface ILoginData {
  readonly email: string
  readonly password: string
}

export interface ILoginResult {
  readonly accessToken: string
}

export interface IAuthService {
  login (data: ILoginData): Promise<ILoginResult>
}
