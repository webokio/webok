import path from 'path'

export const rootDir = __dirname

export const srcDir = path.join(__dirname, 'src')

export const server = {
  port: process.env.PORT || 4000,
}
