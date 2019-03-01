import path from 'path'
import sass from 'sass'

export const rootDir = __dirname

export const srcDir = path.join(__dirname, 'src')

export const server = {
  port: process.env.PORT || 4000,
}

export const build = {
  loaders: {
    scss: {
      implementation: sass,
    },
  },
}
