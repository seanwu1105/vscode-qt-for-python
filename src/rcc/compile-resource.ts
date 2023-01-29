import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import { getToolCommand } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export async function compileResource(
  { extensionUri }: CommandDeps,
  ...args: any[]
): Promise<CompileResourceResult> {
  const targetDocumentUriResult = getTargetDocumentUri(...args)

  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult

  const qrcFile = targetDocumentUriResult.value

  const getToolCommandResult = await getToolCommand({
    tool: 'rcc',
    extensionUri,
    resource: qrcFile,
  })

  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult

  return run({
    command: [
      ...getToolCommandResult.value.command,
      ...getToolCommandResult.value.options,
      qrcFile.fsPath,
    ],
  })
}

type CompileResourceResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
