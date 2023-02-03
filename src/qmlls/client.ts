import type { Observable } from 'rxjs'
import {
  concatMap,
  defer,
  of,
  pairwise,
  ReplaySubject,
  startWith,
  switchMap,
  using,
} from 'rxjs'
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

  const client$ = new ReplaySubject<LanguageClient | undefined>(1)

  return getEnabledFromConfig$({ tool: 'qmlls', resource: undefined }).pipe(
    switchMap(enabled => {
      if (!enabled)
        return defer(async () => {
          client$.next(undefined)
          return { kind: 'Success', value: 'qmlls is disabled' } as const
        })

      return getToolCommand$({
        tool: 'qmlls',
        resource: undefined,
        extensionUri,
      }).pipe(
        concatMap(result => {
          if (result.kind !== 'Success') return of(result)

          return using(
            () => {
              client = createClient({
                command: result.value.command,
                options: result.value.options,
                outputChannel,
              })
              client$.next(client)

              return {
                unsubscribe: () => client?.dispose(),
              }
            },
            () =>
              client$.pipe(
                stopPreviousClient(),
                concatMap(client =>
                  defer(async () => {
                    await client?.start()
                    return {
                      kind: 'Success',
                      value: `qmlls is enabled with latest config: ${JSON.stringify(
                        result.value,
                      )}`,
                    } as const
                  }),
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

// TODO: Unit test this behavior.
function stopPreviousClient() {
  return (source$: Observable<LanguageClient | undefined>) =>
    source$.pipe(
      startWith(undefined),
      pairwise(),
      concatMap(async ([previous]) => previous?.dispose()),
      concatMap(() => source$),
    )
}

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
