const config = require('config')
const { createServices } = require('../tools/dev/lib/services')

const services = createServices('webok', config)

if (require.main === module) {
  services(process.argv.slice(2))
}
