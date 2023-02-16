// Should NOT depend on vscode

import type { ExecException } from 'node:child_process'
import { exec } from 'node:child_process'
import type { SuccessResult } from './types'
import { notNil } from './utils'

export async function run({ command, cwd }: RunArgs) {
  const commandString = wrapAndJoinCommandArgsWithQuotes(command)

  return new Promise<RunResult>(resolve => {
    exec(commandString, { cwd }, (error, stdout, stderr) => {
      if (notNil(error))
        resolve({
          kind: 'ExecError',
          command: commandString,
          error,
          stdout,
          stderr,
        })
      if (stderr.length !== 0)
        resolve({ kind: 'StdErrError', command: commandString, stdout, stderr })
      resolve({
        kind: 'Success',
        value: {
          stdout,
          command: commandString,
        },
      })
    })
  })
}

type RunArgs = { readonly command: CommandArgs; readonly cwd?: string }

export type CommandArgs = readonly string[]

export type RunResult = SuccessResult<RunSuccessValue> | ExecError | StdErrError

type RunSuccessValue = {
  readonly stdout: string
  readonly command: string
}

export type ExecError = {
  readonly kind: 'ExecError'
  readonly command: string
  readonly error: Partial<ExecException>
  readonly stdout: string
  readonly stderr: string
}

export type StdErrError = {
  readonly kind: 'StdErrError'
  readonly command: string
  readonly stdout: string
  readonly stderr: string
}

export function wrapAndJoinCommandArgsWithQuotes(args: CommandArgs): string {
  return args.map(arg => (arg.includes(' ') ? `"${arg}"` : arg)).join(' ')
}
