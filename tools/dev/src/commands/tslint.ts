import { tslint as runTSLint } from '../binaries'

export const tslint = (argv: string[]): Promise<number> => runTSLint('--project', 'tsconfig.json', '--fix', ...argv)
