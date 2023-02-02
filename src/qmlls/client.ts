import type { Observable } from 'rxjs'
import { concatMap, defer, of, using } from 'rxjs'
import type { OutputChannel } from 'vscode'
import type {
  LanguageClientOptions,
  ServerOptions,
} from 'vscode-languageclient/node'
import {
  LanguageClient,
  RevealOutputChannelOn,
} from 'vscode-languageclient/node'
import type { URI } from 'vscode-uri'
import { getEnabledFromConfig$ } from '../configurations'
import type { CommandArgs } from '../run'
import { wrapAndJoinCommandArgsWithQuotes } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export function registerQmlLanguageServer$({
  extensionUri,
  outputChannel,
}: RegisterQmlLanguageServerArgs): Observable<RegisterQmlLanguageServerResult> {
  let client: LanguageClient | undefined = undefined

  return getEnabledFromConfig$({ tool: 'qmlls', resource: undefined }).pipe(
    concatMap(enabled => {
      if (!enabled)
        return defer(async () => {
          await client?.dispose()
          client = undefined

          return { kind: 'Success', value: 'qmlls is disabled' } as const
        })

      return getToolCommand$({
        tool: 'qmlls',
        resource: undefined,
        extensionUri,
      }).pipe(
        concatMap(result => {
          if (result.kind !== 'Success') return of(result)

          return defer(async () => {
            await client?.dispose()
          }).pipe(
            concatMap(() =>
              using(
                () => {
                  client = createClient({
                    command: result.value.command,
                    options: result.value.options,
                    outputChannel,
                  })

                  return { unsubscribe: () => client?.dispose() }
                },
                async () => {
                  await client?.start()
                  return { kind: 'Success', value: 'qmlls is enabled' } as const
                },
              ),
            ),
          )
        }),
      )
    }),
  )
}

type RegisterQmlLanguageServerArgs = {
  readonly extensionUri: URI
  readonly outputChannel: OutputChannel
}

type RegisterQmlLanguageServerResult =
  | ErrorResult<'NotFound'>
  | SuccessResult<string>

function createClient({ command, options, outputChannel }: CreateClientArgs) {
  const serverOptions: ServerOptions = {
    command: wrapAndJoinCommandArgsWithQuotes(command),
    args: [...options],
    options: { shell: true },
  }

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'qml' }],
    outputChannel,
    traceOutputChannel: outputChannel,
    revealOutputChannelOn: RevealOutputChannelOn.Never,
  }

  return new LanguageClient(
    'qmlls',
    'QML Language Server',
    serverOptions,
    clientOptions,
  )
}

type CreateClientArgs = {
  readonly command: CommandArgs
  readonly options: CommandArgs
  readonly outputChannel: OutputChannel
}
