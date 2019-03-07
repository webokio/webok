import bcrypt from 'bcrypt'

const saltRounds = 12

export const hash = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds)
}
