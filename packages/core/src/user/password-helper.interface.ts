export interface IPasswordHelper {
  hashPassword (password: string): Promise<string>
  comparePassword (password: string, passwordHash: string): Promise<boolean>
}
