import type { ExtensionContext, OutputChannel } from 'vscode'
import { commands, window } from 'vscode'
import { COMMANDS } from './commands'
import { EXTENSION_NAMESPACE } from './constants'
import { registerQmlLint } from './qmllint/register'
import type { ExecError, StdErrError } from './run'
import type { ErrorResult, SuccessResult } from './types'
import { registerUicLiveExecution } from './uic/uic-live-execution'

let outputChannel: OutputChannel

export async function activate(context: ExtensionContext) {
  outputChannel = window.createOutputChannel('Qt for Python')

  registerCommands(context)

  registerUicLiveExecution({
    subscriptions: context.subscriptions,
    extensionPath: context.extensionPath,
    onResultReceived,
  })

  registerQmlLint({
    subscriptions: context.subscriptions,
    extensionPath: context.extensionPath,
    onResult: onResultReceived,
  })
}

function registerCommands({ extensionPath, subscriptions }: ExtensionContext) {
  return COMMANDS.map(command =>
    subscriptions.push(
      commands.registerCommand(
        `${EXTENSION_NAMESPACE}.${command.name}`,
        async (...args) => {
          try {
            return onResultReceived(
              await command.callback({ extensionPath }, ...args),
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
        JSON.stringify(result.value, null, indent),
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
  outputChannel.appendLine(message)
  return window.showErrorMessage(message)
}
