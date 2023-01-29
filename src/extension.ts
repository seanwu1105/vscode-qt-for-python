import type { ExtensionContext, OutputChannel } from 'vscode'
import { commands, window } from 'vscode'
import { COMMANDS } from './commands'
import { EXTENSION_NAMESPACE } from './constants'
import { registerQmlLanguageServer } from './qmlls/client'
import type { ExecError, StdErrError } from './run'
import type { ErrorResult, SuccessResult } from './types'
import { registerUicLiveExecution } from './uic/uic-live-execution'

let outputChannel: OutputChannel

export async function activate(context: ExtensionContext) {
  outputChannel = window.createOutputChannel('Qt for Python')

  registerCommands(context)

  registerUicLiveExecution({
    subscriptions: context.subscriptions,
    extensionUri: context.extensionUri,
    onResultReceived,
  })

  registerQmlLanguageServer({
    subscriptions: context.subscriptions,
    extensionUri: context.extensionUri,
    outputChannel,
    onResult: onResultReceived,
  })
}

function registerCommands({ extensionUri, subscriptions }: ExtensionContext) {
  return COMMANDS.map(command =>
    subscriptions.push(
      commands.registerCommand(
        `${EXTENSION_NAMESPACE}.${command.name}`,
        async (...args) => {
          try {
            return onResultReceived(
              await command.callback({ extensionUri }, ...args),
            )
          } catch (e) {
            return onResultReceived({
              kind: 'UnexpectedError',
              message: `Unexpected error: ${JSON.stringify(e)}`,
            })
          }
        },
      ),
    ),
  )
}

function onResultReceived(
  result:
    | SuccessResult<any>
    | ExecError
    | StdErrError
    | ErrorResult<'Unexpected'>
    | ErrorResult<'NotFound'>
    | ErrorResult<'Type'>
    | ErrorResult<'Parse'>
    | ErrorResult<'IO'>,
) {
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
