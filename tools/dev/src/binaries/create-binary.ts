import whichFactory from 'npm-which'
import spawn from 'cross-spawn'

const which = whichFactory(process.cwd())

export const createBinary = (command: string) => (...argv: string[]): Promise<number> => {
  console.log(`> ${command} ${argv.map((arg) => `'${arg}'`).join(' ')}`)
  return new Promise<number>((resolve, reject) => {
    spawn(which.sync(command), argv, { stdio: ['pipe', process.stdout, process.stderr] })
      .on('close', resolve)
      .on('error', reject)
  })
}
