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
import type { CommandArgs, ExecError, StdErrError } from '../run'
import { run, wrapAndJoinCommandArgsWithQuotes } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'

export function registerQmlLanguageServer$({
  extensionUri,
  outputChannel,
}: RegisterQmlLanguageServerArgs): Observable<RegisterQmlLanguageServerResult> {
  const client$ = new ReplaySubject<LanguageClient | undefined>(1)

  const createClient$ = getToolCommand$({
    tool: 'qmlls',
    resource: undefined,
    extensionUri,
  }).pipe(
    concatMap(result => {
      if (result.kind !== 'Success') return of(result)

      return defer(async () => {
        const checkResult = await checkQmllsExists(result.value.command)
        if (checkResult.kind !== 'Success') return checkResult
        return result
      })
    }),
    concatMap(result => {
      if (result.kind !== 'Success') return of(result)

      return using(
        () => {
          const client = createClient({
            command: result.value.command,
            options: result.value.options,
            outputChannel,
          })
          client$.next(client)

          return { unsubscribe: () => client.dispose() }
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

  return getEnabledFromConfig$({ tool: 'qmlls', resource: undefined }).pipe(
    switchMap(enabled => {
      if (!enabled)
        return defer(async () => {
          client$.next(undefined)
          return { kind: 'Success', value: 'qmlls is disabled' } as const
        })

      return createClient$
    }),
  )
}

type RegisterQmlLanguageServerArgs = {
  readonly extensionUri: URI
  readonly outputChannel: OutputChannel
}

type RegisterQmlLanguageServerResult =
  | ErrorResult<'NotFound'>
  | ExecError
  | StdErrError
  | SuccessResult<string>

async function checkQmllsExists(command: CommandArgs) {
  return run({ command: [...command, '--help'] })
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

export function stopPreviousClient() {
  return (source$: Observable<LanguageClient | undefined>) =>
    source$.pipe(
      startWith(undefined),
      pairwise(),
      concatMap(async ([previous]) => previous?.dispose()),
      concatMap(() => source$),
    )
}
