import type { CommandArgs, ExecError, StdErrError } from '../../run'
import { run } from '../../run'
import type { ErrorResult, SuccessResult } from '../../types'

export async function getVersion({
  qmlLintCommand,
}: GetVersionArgs): Promise<GetVersionResult> {
  const runResult = await run({
    command: [...qmlLintCommand, '--version'],
  })

  if (runResult.kind === 'Success') {
    const version = runResult.value.split(' ').at(-1)?.trim()
    if (typeof version !== 'string' || !checkVersionString(version))
      return {
        kind: 'ParseError',
        message: `Could not parse version: ${version}`,
      }
    return { kind: 'Success', value: version }
  }

  return runResult
}

export type GetVersionArgs = {
  readonly qmlLintCommand: CommandArgs
}

export type GetVersionResult =
  | SuccessResult<Version>
  | ErrorResult<'Parse'>
  | ExecError
  | StdErrError

export type Version = `${number}.${number}.${number}`

function checkVersionString(version: string): version is Version {
  const versionRegex = /^\d+\.\d+\.\d+$/
  return versionRegex.test(version)
}
