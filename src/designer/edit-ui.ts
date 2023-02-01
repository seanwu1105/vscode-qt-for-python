import { firstValueFrom } from 'rxjs'
import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export async function editUi(
  { extensionUri }: CommandDeps,
  ...args: any[]
): Promise<EditUiResult> {
  const targetDocumentUriResult = getTargetDocumentUri(...args)

  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult

  const uiFile = targetDocumentUriResult.value

  const getToolCommandResult = await firstValueFrom(
    getToolCommand$({
      tool: 'designer',
      extensionUri,
      resource: uiFile,
    }),
  )

  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult

  return run({
    command: [
      ...getToolCommandResult.value.command,
      ...getToolCommandResult.value.options,
      uiFile.fsPath,
    ],
  })
}

type EditUiResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
