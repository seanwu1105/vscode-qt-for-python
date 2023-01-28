// Should NOT depend on vscode

import type { ExecException } from 'node:child_process'
import { exec } from 'node:child_process'
import type { SuccessResult } from './types'
import { notNil } from './utils'

export async function run({ command, cwd }: RunArgs): Promise<RunResult> {
  return new Promise<RunResult>(resolve => {
    exec(
      wrapAndJoinCommandArgsWithQuotes(command),
      { cwd },
      (error, stdout, stderr) => {
        if (notNil(error)) resolve({ kind: 'ExecError', error, stdout, stderr })
        if (stderr.length !== 0)
          resolve({ kind: 'StdErrError', stdout, stderr })
        resolve({ kind: 'Success', value: stdout })
      },
    )
  })
}

type RunArgs = { readonly command: CommandArgs; readonly cwd?: string }

export type CommandArgs = readonly string[]

export type RunResult = SuccessResult<string> | ExecError | StdErrError

export type ExecError = {
  readonly kind: 'ExecError'
  readonly error: Partial<ExecException>
  readonly stdout: string
  readonly stderr: string
}

export type StdErrError = {
  readonly kind: 'StdErrError'
  readonly stdout: string
  readonly stderr: string
}

export function wrapAndJoinCommandArgsWithQuotes(args: CommandArgs): string {
  return args.map(arg => (arg.includes(' ') ? `"${arg}"` : arg)).join(' ')
}
