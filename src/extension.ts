// TODO: 1. odd behavior when checking is QmlLintType!!!
// TODO: 2. it seems that qmllint does not support whole file content
// TODO: 3. make onNotification work

import type { ExtensionContext } from 'vscode'
import { window } from 'vscode'
import type { LanguageClient } from 'vscode-languageclient/node'
import {
  startClient as startQmlLintClient,
  stopClient as stopQmlLintClient,
} from './qmllint/client'
import type { QmlLintNotification } from './qmllint/server/server'
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
    onNotification,
  })

  if (startResult.kind === 'NotFoundError') {
    window.showErrorMessage(startResult.message)
    return
  }

  subscriptions.push(startResult)

  qmlLintClient = startResult.value
}

function onNotification(n: QmlLintNotification) {
  switch (n.kind) {
    case 'Error':
      window.showErrorMessage(n.message)
  }
}

export async function deactivate() {
  if (notNil(qmlLintClient)) await stopQmlLintClient(qmlLintClient)
}
