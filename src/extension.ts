import type { Observable, Observer } from 'rxjs'
import { catchError, of } from 'rxjs'
import type { ExtensionContext, OutputChannel } from 'vscode'
import { window } from 'vscode'
import { registerCommands$ } from './commands'
import { registerQmlLanguageServer$ } from './qmlls/client'
import { registerQssColorProvider } from './qss/color-provider'
import { registerRccLiveExecution$ } from './rcc/rcc-live-execution'
import type { ExecError, StdErrError } from './run'
import type { ErrorResult, SuccessResult } from './types'
import { registerUicLiveExecution$ } from './uic/uic-live-execution'
import { toDisposable } from './utils'

const JSON_INDENT = 2

export async function activate({
  extensionUri,
  subscriptions,
}: ExtensionContext) {
  const outputChannel = window.createOutputChannel('Qt for Python')
  subscriptions.push(outputChannel)

  subscriptions.push(registerQssColorProvider())

  const observables: readonly Observable<Result>[] = [
    registerCommands$({ extensionUri }),
    registerUicLiveExecution$({ extensionUri }),
    registerRccLiveExecution$({ extensionUri }),
    registerQmlLanguageServer$({ extensionUri, outputChannel }),
  ]

  const observer: Partial<Observer<Result>> = {
    next: v => onResultReceived(v, outputChannel),
    error: e =>
      onResultReceived(
        {
          kind: 'UnexpectedError',
          message: `${JSON.stringify(e, null, JSON_INDENT)}`,
        },
        outputChannel,
      ),
    complete: () =>
      onResultReceived(
        {
          kind: 'Success',
          value: 'An observable is completed',
        },
        outputChannel,
      ),
  }

  const disposables = observables
    .map(observable$ =>
      observable$
        .pipe(
          catchError((err: unknown, caught$) => {
            return of({
              kind: 'UnexpectedError',
              message: `${JSON.stringify(
                err,
                null,
                JSON_INDENT,
              )}\n(caught: ${JSON.stringify(caught$, null, JSON_INDENT)})`,
            } as const)
          }),
        )
        .subscribe(observer),
    )
    .map(toDisposable)

  subscriptions.push(...disposables)
}

function onResultReceived(result: Result, outputChannel: OutputChannel) {
  switch (result.kind) {
    case 'Success':
      return outputChannel.appendLine(
        prefixLogging({
          message:
            typeof result.value === 'string'
              ? result.value
              : JSON.stringify(result.value, null, JSON_INDENT),
          severity: 'INFO',
        }),
      )
    case 'ParseError':
    case 'TypeError':
    case 'NotFoundError':
    case 'UnexpectedError':
      return showError(`${result.kind}: ${result.message}`, outputChannel)
    case 'ExecError':
      return showError(
        `${result.stderr}\n${result.stdout}\n${result.error.message ?? ''}`,
        outputChannel,
      )
    case 'StdErrError':
      return showError(`${result.stderr}\n${result.stdout}`, outputChannel)
  }
}

type Result =
  | SuccessResult<unknown>
  | ExecError
  | StdErrError
  | ErrorResult<'Unexpected'>
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
  | ErrorResult<'Parse'>
  | ErrorResult<'IO'>

async function showError(message: string, outputChannel: OutputChannel) {
  outputChannel.appendLine(prefixLogging({ message, severity: 'ERROR' }))
  return window.showErrorMessage(message)
}

function prefixLogging({ message, severity }: PrefixLoggingArgs) {
  return `[${severity.padEnd(
    Math.max(...LoggingSeverity.map(s => s.length)),
  )} - ${new Date().toLocaleTimeString()}] ${message}`
}

type PrefixLoggingArgs = {
  readonly message: string
  readonly severity: LoggingSeverity
}

const LoggingSeverity = ['INFO', 'ERROR'] as const
type LoggingSeverity = typeof LoggingSeverity[number]
