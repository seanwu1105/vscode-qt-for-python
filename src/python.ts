import { extensions, workspace } from 'vscode'
import type { ErrorResult, SuccessResult } from './result-types'
import { notNil } from './utils'

export function resolveScriptCommand({
  scriptName,
  extensionPath,
}: ResolveScriptCommandArgs) {
  return `${getPythonInterpreterPath()} ${extensionPath}/python/scripts/${scriptName}.py`
}

type ResolveScriptCommandArgs = {
  scriptName: ScriptName
  extensionPath: string
}

type ScriptName = 'qmllint'

async function getPythonInterpreterPath(): Promise<GetPythonInterpreterPathResult> {
  // Get path with the Python extension public API: https://github.com/microsoft/vscode-python/blob/main/src/client/api.ts#L135
  const pythonExtensionApi = await extensions
    .getExtension<PythonExtensionApi>('ms-python.python')
    ?.activate()

  const pythonExecCommand =
    pythonExtensionApi?.settings.getExecutionDetails().execCommand

  if (notNil(pythonExecCommand))
    return { kind: 'Success', value: pythonExecCommand.join(' ') }

  const pythonDefaultInterpreter = workspace
    .getConfiguration('python')
    .get<string>('defaultInterpreterPath')

  if (pythonDefaultInterpreter)
    return { kind: 'Success', value: pythonDefaultInterpreter }

  return {
    kind: 'NotFoundError',
    message:
      'Python interpreter cannot could not be retrieved from the Python extension.',
  }
}

type GetPythonInterpreterPathResult =
  | SuccessResult<string>
  | ErrorResult<'NotFound'>

// Excerpt from: https://github.com/microsoft/vscode-python/blob/344c912a1c15d07eb9b14bf749c7529a7fa0877b/src/client/apiTypes.ts#L15
type PythonExtensionApi = {
  readonly settings: {
    getExecutionDetails(): {
      readonly execCommand: string[] | undefined
    }
  }
}
