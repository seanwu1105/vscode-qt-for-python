import { extensions, workspace } from 'vscode'
import type { ErrorResult, SuccessResult } from './result-types'
import { notNil } from './utils'

export async function resolveScriptCommand({
  scriptName,
  extensionPath,
}: ResolveScriptCommandArgs): Promise<ResolveScriptCommandResult> {
  const pythonInterpreterPathResult = await getPythonInterpreterPath()
  if (pythonInterpreterPathResult.kind === 'Success') {
    return {
      kind: 'Success',
      value: [
        ...pythonInterpreterPathResult.value,
        `${extensionPath}/python/scripts/${scriptName}.py`,
      ],
    }
  }

  return pythonInterpreterPathResult
}

type ResolveScriptCommandArgs = {
  scriptName: ScriptName
  extensionPath: string
}

type ScriptName = 'qmllint'

type ResolveScriptCommandResult = SuccessResult<string[]> | NotFoundError

export type NotFoundError = ErrorResult<'NotFound'>

async function getPythonInterpreterPath(): Promise<GetPythonInterpreterPathResult> {
  // Get path with the Python extension public API: https://github.com/microsoft/vscode-python/blob/main/src/client/apiTypes.ts
  const pythonExtensionApi = await extensions
    .getExtension<PythonExtensionApi>('ms-python.python')
    ?.activate()

  const pythonExecCommand =
    pythonExtensionApi?.settings.getExecutionDetails().execCommand

  if (notNil(pythonExecCommand))
    return { kind: 'Success', value: pythonExecCommand }

  const pythonDefaultInterpreter = workspace
    .getConfiguration('python')
    .get<string>('defaultInterpreterPath')

  if (pythonDefaultInterpreter)
    return { kind: 'Success', value: [pythonDefaultInterpreter] }

  return {
    kind: 'NotFoundError',
    message:
      'Python interpreter cannot could not be retrieved from the Python extension.',
  }
}

type GetPythonInterpreterPathResult =
  | SuccessResult<string[]>
  | ErrorResult<'NotFound'>

// Excerpt from: https://github.com/microsoft/vscode-python/blob/344c912a1c15d07eb9b14bf749c7529a7fa0877b/src/client/apiTypes.ts#L15
type PythonExtensionApi = {
  readonly settings: {
    getExecutionDetails(): {
      readonly execCommand: string[] | undefined
    }
  }
}
