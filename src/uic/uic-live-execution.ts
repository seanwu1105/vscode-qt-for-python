import type { ExtensionContext } from 'vscode'
import { workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from '../constants'
import type { ExecError, StdErrError } from '../run'
import type { ErrorResult, SuccessResult } from '../types'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution({
  extensionUri,
  subscriptions,
  onResultReceived,
}: RegisterUicLiveExecutionArgs) {
  const watcher = workspace.createFileSystemWatcher('**/*.ui')
  watcher.onDidChange(async uri =>
    onResultReceived(await onUiFileUpdated({ uri, extensionUri })),
  )
  watcher.onDidCreate(async uri =>
    onResultReceived(await onUiFileUpdated({ uri, extensionUri })),
  )
  subscriptions.push(watcher)
}

type RegisterUicLiveExecutionArgs = Pick<
  ExtensionContext,
  'subscriptions' | 'extensionUri'
> & {
  readonly onResultReceived: (result: OnUiFileUpdatedResult) => void
}

async function onUiFileUpdated({
  uri,
  extensionUri,
}: OnUiFileUpdatedArgs): Promise<OnUiFileUpdatedResult> {
  const enabled =
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.uic`, uri)
      .get<boolean>('liveExecution') ?? true

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
