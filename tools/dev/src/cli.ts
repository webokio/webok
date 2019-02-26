#!/usr/bin/env node

import commands from './commands'

export const cli = (argv: string[]) => {
  const [commandName, ...commandArgv] = argv
  const command = commands[commandName]
  if (!command) {
    throw new Error(`Command not found: ${commandName}`)
  }
  command(commandArgv)
    .then((exitCode) => {
      if (exitCode) {
        process.exit(exitCode)
      }
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

if (require.main === module) {
  cli(process.argv.slice(2))
}
