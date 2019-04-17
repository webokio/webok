import { IConfig } from 'config'
import { createBinaryWithOptions } from './binaries/create-binary'
import { runCLI } from './run-cli'

const dockerCompose = createBinaryWithOptions('docker-compose')

const createCommands = (dockerProjectId: string, config: IConfig) => {
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
export const createServices = (appId: string, config: IConfig) => {
  const env = process.env.NODE_ENV || 'development'
  const dockerProjectId = `${appId}${env}`
  const commands = createCommands(dockerProjectId, config)
  return (argv: string[]) => {
    runCLI(argv, commands)
  }
}
