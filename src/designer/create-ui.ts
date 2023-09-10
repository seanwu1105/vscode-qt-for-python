import * as path from 'node:path'
import type { FileStat } from 'vscode'
import { FileType, workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import type { CommandDeps } from '../commands'
import { run } from '../run'
import { getToolCommandWithTargetDocumentUri } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export async function createUi(
  { extensionUri }: CommandDeps,
  ...args: readonly unknown[]
) {
  const result = await getToolCommandWithTargetDocumentUri({
    extensionUri,
    argsToGetTargetDocumentUri: args,
    tool: 'designer',
  })
  if (result.kind !== 'Success') return result

  const { command, options, uri } = result.value

  const getDirectoryPathResult = await getDirectoryPath(uri)

  if (getDirectoryPathResult.kind !== 'Success') return getDirectoryPathResult

  return run({
    command: [...command, ...options],
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
