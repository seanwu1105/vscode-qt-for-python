import * as path from 'node:path'
import type { ExtensionContext } from 'vscode'
import type {
  Disposable,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'
import type { NotFoundError } from '../python'
import { resolveScriptCommand } from '../python'
import type { SuccessResult } from '../result-types'
import type { InitializationOptions } from './server/server'
import { QmlLintNotification } from './server/server'

export async function startClient({
  asAbsolutePath,
  extensionPath,
  onNotification,
}: StartClientArgs): Promise<StartClientResult> {
  const serverModule = asAbsolutePath(
    path.join('out', 'qmllint', 'server', 'main.js'),
  )

  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  const qmlLintCommandResult = await resolveScriptCommand({
    scriptName: 'qmllint',
    extensionPath,
  })
  if (qmlLintCommandResult.kind === 'NotFoundError') return qmlLintCommandResult

  const initializationOptions: InitializationOptions = {
    qmlLintCommand: qmlLintCommandResult.value,
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'qml' }],
    initializationOptions,
  }

  const client = new LanguageClient('qmllint', serverOptions, clientOptions)

  const disposables = [
    client,
    client.onNotification(QmlLintNotification, onNotification),
  ]

  await client.start()

  return {
    kind: 'Success',
    value: client,
    dispose: () => disposables.forEach(d => d.dispose()),
  }
}

type StartClientArgs = Pick<
  ExtensionContext,
  'asAbsolutePath' | 'extensionPath'
> & {
  readonly onNotification: (n: QmlLintNotification) => void
}

type StartClientResult =
  | (SuccessResult<LanguageClient> & Disposable)
  | NotFoundError

export async function stopClient(client: LanguageClient) {
  return client.stop()
}
