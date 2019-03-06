import { IConfig } from 'config'
import { runCLI } from './run-cli'
import { createBinaryWithOptions } from './binaries/create-binary'

const appId = 'webok'
const env = process.env.NODE_ENV || 'development'
const dockerProjectId = `${appId}${env}`
const dockerCompose = createBinaryWithOptions('docker-compose')

const createCommands = (config: IConfig) => {
  const start = (argv: string[]): Promise<number> => {
    return dockerCompose(['-p', dockerProjectId, 'up', '-d', ...argv], {
      env: {
        DATABASE_PORT: `${config.get<{ port: number }>('database').port}`,
      },
    })
  }
  const stop = (argv: string[]): Promise<number> => {
    return dockerCompose(['-p', dockerProjectId, 'down', ...argv])
  }
  return { start, stop }
}

// Create a CLI to start and stop development services
export const createServices = (config: IConfig) => {
  const commands = createCommands(config)
  return (argv: string[]) => {
    runCLI(argv, commands)
  }
}
