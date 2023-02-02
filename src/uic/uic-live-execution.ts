import { concatMap, defer, firstValueFrom, fromEventPattern } from 'rxjs'
import { Disposable, workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { getConfiguration$ } from '../configurations'
import { EXTENSION_NAMESPACE } from '../constants'
import type { ExecError, StdErrError } from '../run'
import type { ErrorResult, SuccessResult, SupportedTool } from '../types'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution$({
  extensionUri,
}: GetUicLiveExecutionArgs) {
  return uiFileWatcher$.pipe(
    concatMap(uri => onUiFileUpdated({ uri, extensionUri })),
  )
}

type GetUicLiveExecutionArgs = {
  readonly extensionUri: URI
}

const uiFileWatcher$ = defer(async () =>
  workspace.createFileSystemWatcher('**/*.ui'),
).pipe(
  concatMap(watcher =>
    fromEventPattern<URI>(
      handler =>
        Disposable.from(
          watcher,
          watcher.onDidChange(handler),
          watcher.onDidCreate(handler),
        ),
      (_, disposable) => disposable.dispose(),
    ),
  ),
)

async function onUiFileUpdated({
  uri,
  extensionUri,
}: OnUiFileUpdatedArgs): Promise<OnUiFileUpdatedResult> {
  const tool: SupportedTool = 'uic'
  const enabled = await firstValueFrom(
    getConfiguration$({
      section: `${EXTENSION_NAMESPACE}.${tool}`,
      key: 'liveExecution',
      defaultValue: true,
      resource: uri,
    }),
  )

  if (!enabled) return { kind: 'Success', value: 'Live execution disabled' }

  return compileUi({ extensionUri }, uri)
}

type OnUiFileUpdatedArgs = {
  readonly extensionUri: URI
  readonly uri: URI
}

type OnUiFileUpdatedResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
