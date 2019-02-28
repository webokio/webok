const config = require('config')
const { Page } = require('@webok/pages')

const dbConfig = config.get('database')

module.exports = {
  ...dbConfig,
  entities: [Page],
}
