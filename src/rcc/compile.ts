import type { Uri } from 'vscode'
import { resolveScriptCommand } from '../python'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import type { ErrorResult, SuccessResult } from '../types'

export async function compileResource({
  qrcFile,
  extensionPath,
}: CompileResourceArgs): Promise<CompileResourceResult> {
  const resolveScriptCommandResult = await resolveScriptCommand({
    tool: 'rcc',
    extensionPath,
    resource: qrcFile.toString(),
  })

  if (resolveScriptCommandResult.kind === 'NotFoundError')
    return resolveScriptCommandResult

  return run({ command: [...resolveScriptCommandResult.value, qrcFile.fsPath] })
}

type CompileResourceArgs = {
  readonly qrcFile: Uri
  readonly extensionPath: string
}

type CompileResourceResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
