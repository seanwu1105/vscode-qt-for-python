import type {
  Observable} from 'rxjs';
import {
  combineLatest,
  concatMap,
  defer,
  firstValueFrom,
  iif,
  map,
  of,
} from 'rxjs'
import type { URI } from 'vscode-uri'
import { getOptionsFromConfig$, getPathFromConfig$ } from './configurations'
import { resolveScriptCommand } from './python'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'

// TODO: Remove it.
export async function getToolCommand({
  tool,
  extensionUri,
  resource,
}: GetToolCommandArgs): Promise<GetToolCommandResult> {
  return firstValueFrom(getToolCommand$({ tool, extensionUri, resource }))
}

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

type ToolCommand = {
  readonly command: CommandArgs
  readonly options: CommandArgs
}
