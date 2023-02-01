import * as fs from 'node:fs'
import * as path from 'node:path'
import { firstValueFrom } from 'rxjs'
import type { URI } from 'vscode-uri'
import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'
import { notNil } from '../utils'

export async function createUi(
  { extensionUri }: CommandDeps,
  ...args: any[]
): Promise<CreateUiResult> {
  const targetDocumentUriResult = getTargetDocumentUri(...args)

  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult

  const uri = targetDocumentUriResult.value

  const getToolCommandResult = await firstValueFrom(
    getToolCommand$({
      tool: 'designer',
      extensionUri,
      resource: uri,
    }),
  )

  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult

  const getDirectoryPathResult = await getDirectoryPath(uri)

  if (getDirectoryPathResult.kind !== 'Success') return getDirectoryPathResult

  return run({
    command: [
      ...getToolCommandResult.value.command,
      ...getToolCommandResult.value.options,
    ],
    cwd: getDirectoryPathResult.value,
  })
}

type CreateUiResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
  | ErrorResult<'IO'>

async function getDirectoryPath(uri: URI): Promise<GetDirectoryPathResult> {
  return new Promise<GetDirectoryPathResult>(resolve => {
    fs.lstat(uri.fsPath, (err, stats) => {
      if (notNil(err))
        resolve({ kind: 'IOError', message: `${JSON.stringify(err)}` })
      else if (stats.isDirectory())
        resolve({ kind: 'Success', value: uri.fsPath })
      else resolve({ kind: 'Success', value: path.dirname(uri.fsPath) })
    })
  })
}

type GetDirectoryPathResult = SuccessResult<string> | ErrorResult<'IO'>
