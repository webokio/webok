// TODO find a better way to load config in production

process.env.NODE_CONFIG_DIR = '../../../config'

import config from 'config'

export { config }
