import * as path from 'path'
import type { ExtensionContext } from 'vscode'
import type {
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'

export async function startClient({
  asAbsolutePath,
  extensionPath,
}: Pick<ExtensionContext, 'asAbsolutePath' | 'extensionPath'>) {
  const serverModule = asAbsolutePath(path.join('out', 'qmllint', 'server.js'))

  const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }

  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  }

  const initializationOptions: InitializationOptions = { extensionPath }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'qml' }],
    initializationOptions: initializationOptions,
  }

  const client = new LanguageClient('qmllint', serverOptions, clientOptions)

  await client.start()

  return client
}

export async function stopClient(client: LanguageClient) {
  return client.stop()
}

export type InitializationOptions = { extensionPath: string }
