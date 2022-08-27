import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import { resolveScriptCommand } from '../python'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import type { ErrorResult, SuccessResult } from '../types'

export async function compileResource(
  { extensionPath }: CommandDeps,
  ...args: any[]
): Promise<CompileResourceResult> {
  const targetDocumentUriResult = getTargetDocumentUri(...args)

  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult

  const qrcFile = targetDocumentUriResult.value

  const resolveScriptCommandResult = await resolveScriptCommand({
    tool: 'rcc',
    extensionPath,
    resource: qrcFile.toString(),
  })

  if (resolveScriptCommandResult.kind === 'NotFoundError')
    return resolveScriptCommandResult

  return run({ command: [...resolveScriptCommandResult.value, qrcFile.fsPath] })
}

type CompileResourceResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
