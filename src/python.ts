import * as path from 'node:path'
import { extensions, workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'
import { notNil } from './utils'

export async function resolveScriptCommand({
  tool,
  extensionUri,
  resource,
}: ResolveScriptCommandArgs): Promise<ResolveScriptCommandResult> {
  const pythonInterpreterPathResult = await getPythonInterpreterPath(resource)

  if (pythonInterpreterPathResult.kind !== 'Success')
    return pythonInterpreterPathResult

  return {
    kind: 'Success',
    value: [
      ...pythonInterpreterPathResult.value,
      path.join(extensionUri.fsPath, 'python', 'scripts', `${tool}.py`),
    ],
  }
}

export type ResolveScriptCommandArgs = {
  readonly tool: SupportedTool
  readonly extensionUri: URI
  readonly resource: URI | undefined
}

export type ResolveScriptCommandResult =
  | SuccessResult<CommandArgs>
  | ErrorResult<'NotFound'>

async function getPythonInterpreterPath(
  resource: URI | undefined,
): Promise<GetPythonInterpreterPathResult> {
  // Get path with the Python extension public API: https://github.com/microsoft/vscode-python/blob/main/src/client/apiTypes.ts
  const pythonExtensionApi = await extensions
    .getExtension<PythonExtensionApi>('ms-python.python')
    ?.activate()

  const pythonExecCommand =
    pythonExtensionApi?.settings.getExecutionDetails(resource).execCommand

  if (notNil(pythonExecCommand))
    return { kind: 'Success', value: pythonExecCommand }

  const pythonDefaultInterpreter = workspace
    .getConfiguration('python', resource)
    .get<string>('defaultInterpreterPath')

  if (notNil(pythonDefaultInterpreter) && pythonDefaultInterpreter.length !== 0)
    return { kind: 'Success', value: [pythonDefaultInterpreter] }

  return {
    kind: 'NotFoundError',
    message:
      'Python interpreter cannot could not be retrieved from the Python extension.',
  }
}

type GetPythonInterpreterPathResult =
  | SuccessResult<CommandArgs>
  | ErrorResult<'NotFound'>

// Excerpt from: https://github.com/microsoft/vscode-python/blob/344c912a1c15d07eb9b14bf749c7529a7fa0877b/src/client/apiTypes.ts#L15
export type PythonExtensionApi = {
  readonly settings: {
    getExecutionDetails(resource: URI | undefined): {
      readonly execCommand: CommandArgs | undefined
    }
  }
}
