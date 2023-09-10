import type { Observable } from 'rxjs'
import {
  combineLatest,
  defer,
  firstValueFrom,
  iif,
  map,
  of,
  switchMap,
} from 'rxjs'
import { window } from 'vscode'
import { URI } from 'vscode-uri'
import { getOptionsFromConfig$, getPathFromConfig$ } from './configurations'
import { resolveScriptCommand$ } from './python'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'
import { isNil } from './utils'

export function getToolCommand$({
  tool,
  extensionUri,
  resource,
}: GetToolCommandArgs): Observable<GetToolCommandResult> {
  return defer(() =>
    combineLatest([
      getPathFromConfig$({ tool, resource }),
      getOptionsFromConfig$({ tool, resource }),
    ]),
  ).pipe(
    switchMap(([path, options]) =>
      iif(
        () => path.length > 0,

        of({
          kind: 'Success',
          value: { command: [path], options },
        } as const),

        resolveScriptCommand$({ tool, extensionUri, resource }).pipe(
          map(result => {
            if (result.kind === 'NotFoundError') return result

            return {
              kind: 'Success',
              value: { command: result.value, options },
            } as const
          }),
        ),
      ),
    ),
  )
}

type GetToolCommandArgs = {
  readonly tool: SupportedTool
  readonly extensionUri: URI
  readonly resource: URI | undefined
}

export type GetToolCommandResult =
  | SuccessResult<ToolCommand>
  | ErrorResult<'NotFound'>

export type ToolCommand = {
  readonly command: CommandArgs
  readonly options: CommandArgs
}

export async function getToolCommandWithTargetDocumentUri({
  extensionUri,
  argsToGetTargetDocumentUri,
  tool,
}: GetToolCommandWithTargetDocumentUriArgs): Promise<GetToolCommandWithTargetDocumentUriResult> {
  const targetDocumentUriResult = getTargetDocumentUri(
    argsToGetTargetDocumentUri,
  )
  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult
  const uri = targetDocumentUriResult.value
  const getToolCommandResult = await firstValueFrom(
    getToolCommand$({ tool, extensionUri, resource: uri }),
  )
  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult
  return {
    kind: 'Success',
    value: { ...getToolCommandResult.value, uri },
  } as const
}

export type GetToolCommandWithTargetDocumentUriArgs = {
  readonly extensionUri: URI
  readonly argsToGetTargetDocumentUri: readonly unknown[]
  readonly tool: SupportedTool
}

export type GetToolCommandWithTargetDocumentUriResult =
  | SuccessResult<{
      readonly command: CommandArgs
      readonly options: CommandArgs
      readonly uri: URI
    }>
  | ErrorResult<'Type'>
  | ErrorResult<'NotFound'>

function getTargetDocumentUri(
  args: readonly unknown[],
): GetTargetDocumentUriResult {
  if (isNil(args[0])) {
    const activeDocument = window.activeTextEditor?.document.uri

    if (isNil(activeDocument))
      return { kind: 'TypeError', message: 'No active document.' }

    return { kind: 'Success', value: activeDocument }
  }

  if (!URI.isUri(args[0]))
    return {
      kind: 'TypeError',
      message: `Invalid argument: ${JSON.stringify(args[0])}`,
    }

  return { kind: 'Success', value: args[0] }
}

type GetTargetDocumentUriResult = SuccessResult<URI> | ErrorResult<'Type'>
