import bcrypt from 'bcrypt'

const saltRounds = 10

export const hash = (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds)
}
