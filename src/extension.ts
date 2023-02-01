import type { Observer } from 'rxjs'
import type { ExtensionContext, OutputChannel } from 'vscode'
import { window } from 'vscode'
import { registerCommands$ } from './commands'
import type { ExecError, StdErrError } from './run'
import type { ErrorResult, SuccessResult } from './types'
import { getUicLiveExecution$ } from './uic/uic-live-execution'
import { toDisposable } from './utils'

let outputChannel: OutputChannel

export async function activate({
  extensionUri,
  subscriptions,
}: ExtensionContext) {
  outputChannel = window.createOutputChannel('Qt for Python')
  subscriptions.push(outputChannel)

  const observables = [
    registerCommands$({ extensionUri }),
    getUicLiveExecution$({ extensionUri }),
  ]

  const observer: Partial<Observer<Result>> = {
    next: v => onResultReceived(v),
    error: e =>
      onResultReceived({
        kind: 'UnexpectedError',
        message: `Unexpected error: ${JSON.stringify(e)}`,
      }),
  }

  const disposables = observables
    .map(observable$ => observable$.subscribe(observer))
    .map(toDisposable)

  subscriptions.push(...disposables)

  // registerQmlLanguageServer({
  //   subscriptions: context.subscriptions,
  //   extensionUri: context.extensionUri,
  //   outputChannel,
  //   onResult: onResultReceived,
  // })
}

function onResultReceived(result: Result) {
  const indent = 2
  switch (result.kind) {
    case 'Success':
      return outputChannel.appendLine(
        prefixLogging({
          message: JSON.stringify(result.value, null, indent),
          severity: 'INFO',
        }),
      )
    case 'ParseError':
    case 'TypeError':
    case 'NotFoundError':
    case 'UnexpectedError':
      return showError(result.message)
    case 'ExecError':
      return showError(
        `${result.stderr}\n${result.stdout}\n${result.error.message ?? ''}`,
      )
    case 'StdErrError':
      return showError(`${result.stderr}\n${result.stdout}`)
  }
}

type Result =
  | SuccessResult<any>
  | ExecError
  | StdErrError
  | ErrorResult<'Unexpected'>
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
  | ErrorResult<'Parse'>
  | ErrorResult<'IO'>

async function showError(message: string) {
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
