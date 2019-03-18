export interface ILoginData {
  readonly email: string
  readonly password: string
}

export interface ILoginResult {
  readonly token: string
}

export interface IAuthService {
  login (data: ILoginData): Promise<ILoginResult>
}
