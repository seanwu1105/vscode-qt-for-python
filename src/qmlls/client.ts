import { firstValueFrom } from 'rxjs'
import type { Disposable, OutputChannel } from 'vscode'
import { workspace } from 'vscode'
import type {
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import {
  LanguageClient,
  RevealOutputChannelOn,
} from 'vscode-languageclient/node'
import type { URI } from 'vscode-uri'
import { wrapAndJoinCommandArgsWithQuotes } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'
import { withConcatMap } from '../utils'

export async function registerQmlLanguageServer({
  subscriptions,
  extensionUri,
  outputChannel,
  onResult,
}: RegisterQmlLanguageServerArgs) {
  let client: LanguageClient | undefined

  subscriptions.push(
    // Make sure the configuration is in "window" scope.
    workspace.onDidChangeConfiguration(
      withConcatMap(async e => {
        if (!e.affectsConfiguration('qtForPython.qmlls')) return

        return await activateClient()
      }),
    ),
  )

  await activateClient()

  async function activateClient() {
    await stopClient()

    // TODO: Use `getEnabledFromConfig$` instead.
    if (!workspace.getConfiguration('qtForPython.qmlls').get('enabled')) return

    const startClientResult = await startClient({
      extensionUri,
      outputChannel,
    })

    if (startClientResult.kind !== 'Success') return onResult(startClientResult)

    client = startClientResult.value
    subscriptions.push(client)
  }

  async function stopClient() {
    await client?.stop()
    client = undefined
  }
}

type RegisterQmlLanguageServerArgs = {
  readonly subscriptions: Disposable[]
  readonly extensionUri: URI
  readonly outputChannel: OutputChannel
  readonly onResult: (result: StartClientResult) => void
}

async function startClient({
  extensionUri,
  outputChannel,
}: StartClientArgs): Promise<StartClientResult> {
  // TODO: Make it reactive.
  const getToolCommandResult = await firstValueFrom(
    getToolCommand$({
      tool: 'qmlls',
      extensionUri,
      resource: undefined,
    }),
  )

  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult

  const serverOptions: ServerOptions = {
    command: wrapAndJoinCommandArgsWithQuotes(
      getToolCommandResult.value.command,
    ),
    args: [...getToolCommandResult.value.options],
    options: { shell: true },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'qml' }],
    outputChannel,
    traceOutputChannel: outputChannel,
    revealOutputChannelOn: RevealOutputChannelOn.Never,
  }

  const client = new LanguageClient(
    'qmlls',
    'QML Language Server',
    serverOptions,
    clientOptions,
  )

  await client.start()

  return { kind: 'Success', value: client }
}

type StartClientArgs = {
  readonly extensionUri: URI
  readonly outputChannel: OutputChannel
}

type StartClientResult = SuccessResult<LanguageClient> | ErrorResult<'NotFound'>
