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
    case 'ParseError':
      return window.showErrorMessage(n.message)
    case 'ExecError':
      return window.showErrorMessage(
        `${n.stderr}\n${n.stdout}\n${n.error.message ?? ''}`,
      )
    case 'StdErrError':
      return window.showErrorMessage(`${n.stderr}\n${n.stdout}`)
  }
}

export async function deactivate() {
  if (notNil(qmlLintClient)) await stopQmlLintClient(qmlLintClient)
}
