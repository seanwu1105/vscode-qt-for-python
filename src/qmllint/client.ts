import * as path from 'node:path'
import type { ExtensionContext } from 'vscode'
import type {
  Disposable,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'
import { getToolCommand } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'
import type { QmlLintNotification } from './server/notifications'
import { QmlLintNotificationType } from './server/notifications'
import { QmlLintCommandRequestType } from './server/requests'

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

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'qml' }],
  }

  const client = new LanguageClient(
    'qmllint Language Server',
    serverOptions,
    clientOptions,
  )

  const disposables = [
    client,
    client.onNotification(QmlLintNotificationType, onNotification),
    client.onRequest(QmlLintCommandRequestType, async ({ resource }) =>
      getToolCommand({ tool: 'qmllint', extensionPath, resource }),
    ),
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
  | ErrorResult<'NotFound'>

export async function stopClient(client: LanguageClient) {
  return client.stop()
}
