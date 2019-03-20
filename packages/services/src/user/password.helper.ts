import bcrypt from 'bcrypt'
import { IPasswordHelper } from '@webok/core/lib/user'

const saltRounds = 12

export class PasswordHelper implements IPasswordHelper {
  async hashPassword (password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds)
  }

  async verifyPassword (password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
  }
}
