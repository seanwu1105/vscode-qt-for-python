import { combineLatest, concatMap, defer, iif, map, Observable, of } from 'rxjs'
import type { URI } from 'vscode-uri'
import { getOptionsFromConfig$, getPathFromConfig$ } from './configurations'
import { resolveScriptCommand } from './python'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'

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
    concatMap(([path, options]) =>
      iif(
        () => path.length > 0,

        of({
          kind: 'Success',
          value: { command: [path], options },
        } as const),

        defer(() =>
          resolveScriptCommand({ tool, extensionUri, resource }),
        ).pipe(
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
