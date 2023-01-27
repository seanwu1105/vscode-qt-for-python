import type { ExtensionContext } from 'vscode'
import { workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from '../constants'
import type { ExecError, StdErrError } from '../run'
import type { ErrorResult, SuccessResult } from '../types'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution({
  extensionPath,
  subscriptions,
  onResultReceived,
}: RegisterUicLiveExecutionArgs) {
  const watcher = workspace.createFileSystemWatcher('**/*.ui')
  watcher.onDidChange(async uri =>
    onResultReceived(
      await onUiFileUpdated({ uri, extensionPath: extensionPath }),
    ),
  )
  watcher.onDidCreate(async uri =>
    onResultReceived(
      await onUiFileUpdated({ uri, extensionPath: extensionPath }),
    ),
  )
  subscriptions.push(watcher)
}

type RegisterUicLiveExecutionArgs = Pick<
  ExtensionContext,
  'subscriptions' | 'extensionPath'
> & {
  readonly onResultReceived: (result: OnUiFileUpdatedResult) => void
}

async function onUiFileUpdated({
  uri,
  extensionPath,
}: OnUiFileUpdatedArgs): Promise<OnUiFileUpdatedResult> {
  const enabled =
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.uic`, uri)
      .get<boolean>('liveExecution') ?? true

  if (!enabled) return { kind: 'Success', value: 'Live execution disabled' }

  return compileUi({ extensionPath }, uri)
}

type OnUiFileUpdatedArgs = {
  readonly extensionPath: string
  readonly uri: URI
}

type OnUiFileUpdatedResult =
  | SuccessResult<string>
  | ExecError
  | StdErrError
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
