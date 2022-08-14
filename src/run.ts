import { exec } from 'child_process'
import { promisify } from 'util'
import type { ErrorResult, SuccessResult } from './result-types'

export async function run({ command, cwd }: RunArgs): Promise<RunResult> {
  try {
    const { stdout, stderr } = await promisify(exec)(command.join(' '), { cwd })
    if (stderr) return { kind: 'StdErrError', message: stderr }
    return { kind: 'Success', value: stdout }
  } catch (e) {
    return { kind: 'ExecutionError', message: JSON.stringify(e) }
  }
}

type RunArgs = {
  command: readonly string[]
  cwd: string
}

type RunResult =
  | SuccessResult<string>
  | ErrorResult<'StdErr'>
  | ErrorResult<'Execution'>
