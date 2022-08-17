// TODO: 1. odd behavior when checking is QmlLintType!!!
// TODO: 2. it seems that qmllint does not support whole file content
// TODO: 3. make onNotification work

import type { ExtensionContext } from 'vscode'
import type { LanguageClient } from 'vscode-languageclient/node'
import {
  startClient as startQmlLintClient,
  stopClient as stopQmlLintClient,
} from './qmllint/client'
import { notNil } from './utils'

let qmlLintClient: LanguageClient | undefined = undefined

export async function activate({
  asAbsolutePath,
  extensionPath,
  subscriptions,
}: ExtensionContext) {
  const startResult = await startQmlLintClient({
    asAbsolutePath,
    extensionPath,
    // eslint-disable-next-line no-console
    onNotification: n => console.log(n.message),
  })
  if (startResult.kind === 'NotFoundError') {
    // TODO: Show error to user
    // eslint-disable-next-line no-console
    console.error(startResult.message)
    return
  }

  subscriptions.push(startResult)

  qmlLintClient = startResult.value
}

export async function deactivate() {
  if (notNil(qmlLintClient)) await stopQmlLintClient(qmlLintClient)
}
