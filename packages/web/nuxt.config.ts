import path from 'path'
import sass from 'sass'

export const rootDir = __dirname

export const srcDir = path.join(__dirname, 'src')

export const server = {
  port: process.env.PORT || 4000,
}

export const plugins = [path.join(__dirname, 'src/plugins/vuetify.ts')]

export const css = ['vuetify/dist/vuetify.css']

export const head = {
  titleTemplate: (title: string): string => {
    return `${title ? `${title} - ` : ''}WebOK`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
  ],
  link: [
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
    },
    {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
      integrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
      crossorigin: 'anonymous',
    },
  ],
}

export const build = {
  loaders: {
    scss: {
      implementation: sass,
    },
  },
  extend (config: any) {
    // Allow to mock dependencies
    config.resolve.modules.unshift(path.join(__dirname, 'mock_dependencies'))
  },
}
