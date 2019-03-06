import whichFactory from 'npm-which'
import spawn from 'cross-spawn'
import { SpawnOptions } from 'child_process'

const which = whichFactory(process.cwd())

export const createBinary = (command: string) => {
  const binary = createBinaryWithOptions(command)
  return (...argv: string[]): Promise<number> => binary(argv)
}

export const createBinaryWithOptions = (command: string) => {
  const fullCommand = which.sync(command)
  return (argv: string[], options?: SpawnOptions): Promise<number> => {
    console.log(`> ${command} ${argv.map((arg) => `'${arg}'`).join(' ')}`)
    return new Promise<number>((resolve, reject) => {
      spawn(fullCommand, argv, { stdio: ['pipe', process.stdout, process.stderr], ...options })
        .on('close', resolve)
        .on('error', reject)
    })
  }
}
