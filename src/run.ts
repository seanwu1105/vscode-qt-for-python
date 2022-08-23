import type { ExecException } from 'node:child_process'
import { exec } from 'node:child_process'
import type { SuccessResult } from './result-types'
import { notNil } from './utils'

export async function run({ command }: RunArgs): Promise<RunResult> {
  return new Promise<RunResult>(resolve => {
    exec(
      command.map(s => (s.includes(' ') ? `"${s}"` : s)).join(' '),
      (error, stdout, stderr) => {
        if (notNil(error)) resolve({ kind: 'ExecError', error, stdout, stderr })
        if (stderr.length !== 0)
          resolve({ kind: 'StdErrError', stdout, stderr })
        resolve({ kind: 'Success', value: stdout })
      },
    )
  })
}

type RunArgs = { command: CommandArgs }

export type CommandArgs = readonly string[]

type RunResult = SuccessResult<string> | ExecError | StdErrError

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
