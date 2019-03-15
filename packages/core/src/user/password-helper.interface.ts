export interface IPasswordHelper {
  hashPassword (password: string): Promise<string>
}
