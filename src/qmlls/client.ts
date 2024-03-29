import type { Observable } from 'rxjs'
import {
  combineLatest,
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
import { run, wrapAndJoinCommandArgsWithQuotes } from '../run'
import type { ToolCommand } from '../tool-utils'
import { getToolCommand$ } from '../tool-utils'

export function registerQmlLanguageServer$({
  extensionUri,
  outputChannel,
}: RegisterQmlLanguageServerArgs) {
  const client$ = new ReplaySubject<LanguageClient | undefined>(1)

  const createClient$ = (toolCommand: ToolCommand) =>
    using(
      () => {
        const client = createClient({
          command: toolCommand.command,
          options: toolCommand.options,
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
                value: `qmlls is running with the command: '${wrapAndJoinCommandArgsWithQuotes(
                  [...toolCommand.command, ...toolCommand.options],
                )}'`,
              } as const
            }),
          ),
        ),
    )

  const createClientIfQmllsExists$ = (toolCommand: ToolCommand) =>
    defer(async () => checkQmllsExists(toolCommand.command)).pipe(
      concatMap(checkResult => {
        if (checkResult.kind !== 'Success') return of(checkResult)
        return createClient$(toolCommand)
      }),
    )

  return combineLatest([
    getEnabledFromConfig$({ tool: 'qmlls', resource: undefined }),
    getToolCommand$({
      tool: 'qmlls',
      resource: undefined,
      extensionUri,
    }),
  ]).pipe(
    switchMap(([enabled, result]) => {
      if (!enabled)
        return defer(async () => {
          client$.next(undefined)
          return { kind: 'Success', value: 'qmlls has been stopped' } as const
        })

      if (result.kind !== 'Success') return of(result)

      return createClientIfQmllsExists$(result.value)
    }),
  )
}

type RegisterQmlLanguageServerArgs = {
  readonly extensionUri: URI
  readonly outputChannel: OutputChannel
}

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
