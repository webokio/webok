import bcrypt from 'bcrypt'

const saltRounds = 12

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds)
}
