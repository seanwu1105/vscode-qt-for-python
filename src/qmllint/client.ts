import * as path from 'node:path'
import type { ExtensionContext } from 'vscode'
import type {
  Disposable,
  DocumentUri,
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import { LanguageClient, TransportKind } from 'vscode-languageclient/node'
import { getOptionsFromConfig, getPathFromConfig } from '../configurations'
import { resolveScriptCommand } from '../python'
import type { ErrorResult, SuccessResult } from '../types'
import type { QmlLintNotification } from './server/notifications'
import { QmlLintNotificationType } from './server/notifications'
import type { QmlLintCommandResponse } from './server/requests'
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

  const client = new LanguageClient('qmllint', serverOptions, clientOptions)

  const disposables = [
    client,
    client.onNotification(QmlLintNotificationType, onNotification),
    client.onRequest(QmlLintCommandRequestType, async ({ resource }) =>
      resolveQmlLintCommand({ extensionPath, resource }),
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

async function resolveQmlLintCommand({
  extensionPath,
  resource,
}: ResolveQmlLintCommandArgs): Promise<QmlLintCommandResponse> {
  const qmlLintOptions = getOptionsFromConfig({ tool: 'qmllint', resource })

  const qmlLintPath = getPathFromConfig({ tool: 'qmllint', resource })

  if (qmlLintPath.length !== 0)
    return {
      kind: 'Success',
      value: {
        command: [qmlLintPath],
        options: qmlLintOptions,
      },
    }

  const resolveScriptCommandResult = await resolveScriptCommand({
    tool: 'qmllint',
    extensionPath,
    resource,
  })

  if (resolveScriptCommandResult.kind === 'NotFoundError')
    return resolveScriptCommandResult

  return {
    kind: 'Success',
    value: {
      command: resolveScriptCommandResult.value,
      options: qmlLintOptions,
    },
  }
}

type ResolveQmlLintCommandArgs = {
  readonly extensionPath: string
  readonly resource: DocumentUri
}

export async function stopClient(client: LanguageClient) {
  return client.stop()
}
