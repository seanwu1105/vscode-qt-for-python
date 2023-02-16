import * as path from 'node:path'
import type { Observable } from 'rxjs'
import { concatMap, defer, fromEventPattern, map, merge, of } from 'rxjs'
import type { Event } from 'vscode'
import { extensions } from 'vscode'
import type { URI } from 'vscode-uri'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'
import { isNil } from './utils'

export function resolveScriptCommand$({
  tool,
  extensionUri,
  resource,
}: ResolveScriptCommandArgs): Observable<ResolveScriptCommandResult> {
  return defer(() => getPythonInterpreterPath$(resource)).pipe(
    map(result => {
      if (result.kind !== 'Success') return result
      return {
        kind: 'Success',
        value: [
          ...result.value,
          path.join(extensionUri.fsPath, 'python', 'scripts', `${tool}.py`),
        ],
      } as const
    }),
  )
}

type ResolveScriptCommandArgs = {
  readonly tool: SupportedTool
  readonly extensionUri: URI
  readonly resource: URI | undefined
}

export type ResolveScriptCommandResult =
  | SuccessResult<CommandArgs>
  | ErrorResult<'NotFound'>

function getPythonInterpreterPath$(resource: URI | undefined) {
  return defer(async () => getPythonExtensionApi()).pipe(
    concatMap(result => {
      if (result.kind !== 'Success') return of(result)
      return merge(
        of(getPythonExecCommand({ api: result.value, resource })),
        fromEventPattern<GetPythonInterpreterPathResult>(
          handler =>
            result.value.settings.onDidChangeExecutionDetails(() =>
              handler(getPythonExecCommand({ api: result.value, resource })),
            ),
          (_, disposable) => disposable.dispose(),
        ),
      )
    }),
  )
}

type GetPythonInterpreterPathResult =
  | SuccessResult<CommandArgs>
  | ErrorResult<'NotFound'>

async function getPythonExtensionApi() {
  const pythonExtensionApi = await extensions
    .getExtension<PythonExtensionApi>('ms-python.python')
    ?.activate()

  if (isNil(pythonExtensionApi))
    return {
      kind: 'NotFoundError',
      message: 'Python extension not found.',
    } as const

  await pythonExtensionApi.ready

  return { kind: 'Success', value: pythonExtensionApi } as const
}

function getPythonExecCommand({ api, resource }: GetPythonExecCommandArgs) {
  const command = api.settings.getExecutionDetails(resource).execCommand

  if (isNil(command) || command.length === 0)
    return {
      kind: 'NotFoundError',
      message:
        'Python interpreter cannot could not be retrieved from the Python extension.',
    } as const

  return { kind: 'Success', value: [...command] } as const
}

type GetPythonExecCommandArgs = {
  readonly api: PythonExtensionApi
  readonly resource: URI | undefined
}

// Excerpt from: https://github.com/microsoft/vscode-python/blob/344c912a1c15d07eb9b14bf749c7529a7fa0877b/src/client/apiTypes.ts
type PythonExtensionApi = {
  ready: Promise<void>
  settings: {
    readonly onDidChangeExecutionDetails: Event<URI | undefined>

    getExecutionDetails(resource: URI | undefined): {
      readonly execCommand: CommandArgs | undefined
    }
  }
}
