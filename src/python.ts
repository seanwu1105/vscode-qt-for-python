import * as path from 'node:path'
import type { Uri } from 'vscode'
import { extensions, workspace } from 'vscode'
import type { DocumentUri } from 'vscode-languageclient'
import { URI } from 'vscode-uri'
import type { SupportedTool } from './configurations'
import type { ErrorResult, SuccessResult } from './result-types'
import type { CommandArgs } from './run'
import { notNil } from './utils'

export async function resolveScriptCommand({
  tool,
  extensionPath,
  resource,
}: ResolveScriptCommandArgs): Promise<ResolveScriptCommandResult> {
  const pythonInterpreterPathResult = await getPythonInterpreterPath(
    URI.parse(resource),
  )
  if (pythonInterpreterPathResult.kind === 'Success') {
    return {
      kind: 'Success',
      value: [
        ...pythonInterpreterPathResult.value,
        path.join(extensionPath, 'python', 'scripts', `${tool}.py`),
      ],
    }
  }

  return pythonInterpreterPathResult
}

export type ResolveScriptCommandArgs = {
  readonly tool: SupportedTool
  readonly extensionPath: string
  readonly resource: DocumentUri
}

export type ResolveScriptCommandResult =
  | SuccessResult<CommandArgs>
  | ErrorResult<'NotFound'>

async function getPythonInterpreterPath(
  resource: Uri,
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
    getExecutionDetails(resource: Uri): {
      readonly execCommand: CommandArgs | undefined
    }
  }
}
