// TODO: 1. odd behavior when checking is QmlLintType!!!
// TODO: 2. it seems that qmllint does not support whole file content
// TODO: 3. make onNotification work

import type { ExtensionContext } from 'vscode'
import type { Disposable, LanguageClient } from 'vscode-languageclient/node'
import {
  startClient as startQmlLintClient,
  stopClient as stopQmlLintClient,
} from './qmllint/client'
import { notNil } from './utils'

let qmlLintClient: LanguageClient | undefined = undefined

const disposables: readonly Disposable[] = []

export async function activate({
  asAbsolutePath,
  extensionPath,
}: ExtensionContext) {
  const startResult = await startQmlLintClient({
    asAbsolutePath,
    extensionPath,
  })
  if (startResult.kind === 'NotFoundError') {
    // TODO: Show error to user
    // eslint-disable-next-line no-console
    console.error(startResult.message)
    return
  }

  qmlLintClient = startResult.value
  // TODO: Enable the following.
  // disposables = [
  //   ...disposables,
  //   qmlLintClient.onNotification(
  //     ErrorNotification,
  //     ({ message }: ErrorNotification) => console.error(message),
  //   ),
  // ]
}

export async function deactivate() {
  if (notNil(qmlLintClient)) await stopQmlLintClient(qmlLintClient)
  disposables.forEach(d => d.dispose())
}
