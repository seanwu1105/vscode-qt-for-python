import * as path from 'node:path'
import { firstValueFrom } from 'rxjs'
import type { FileStat } from 'vscode'
import { FileType, workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import { run } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export async function createUi({ extensionUri }: CommandDeps, ...args: any[]) {
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

async function getDirectoryPath(uri: URI): Promise<GetDirectoryPathResult> {
  let stat: FileStat
  try {
    stat = await workspace.fs.stat(uri)
  } catch (err) {
    return { kind: 'IOError', message: `${JSON.stringify(err)}` }
  }

  if (stat.type === FileType.Directory)
    return { kind: 'Success', value: uri.fsPath }
  return { kind: 'Success', value: path.dirname(uri.fsPath) }
}

type GetDirectoryPathResult = SuccessResult<string> | ErrorResult<'IO'>
