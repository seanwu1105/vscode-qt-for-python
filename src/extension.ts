import type { ExtensionContext } from 'vscode'
import { commands, window } from 'vscode'
import type { LanguageClient } from 'vscode-languageclient/node'
import { COMMANDS } from './commands'
import { EXTENSION_NAMESPACE } from './constants'
import {
  startClient as startQmlLintClient,
  stopClient as stopQmlLintClient,
} from './qmllint/client'
import type { ExecError, StdErrError } from './run'
import type { ErrorResult, SuccessResult } from './types'
import { notNil } from './utils'

let outputChannel: ReturnType<typeof window.createOutputChannel>
let qmlLintClient: LanguageClient | undefined = undefined

export async function activate(context: ExtensionContext) {
  outputChannel = window.createOutputChannel('Qt for Python')
  registerCommands(context)
  await activateQmlLintFeatures(context)
}

function registerCommands(context: ExtensionContext) {
  return COMMANDS.map(command =>
    context.subscriptions.push(
      commands.registerCommand(
        `${EXTENSION_NAMESPACE}.${command.name}`,
        async (...args) => {
          try {
            return onResultReceived(await command.callback(context, ...args))
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

async function activateQmlLintFeatures({
  asAbsolutePath,
  extensionPath,
  subscriptions,
}: Pick<
  ExtensionContext,
  'asAbsolutePath' | 'extensionPath' | 'subscriptions'
>) {
  const startResult = await startQmlLintClient({
    asAbsolutePath,
    extensionPath,
    onNotification: onResultReceived,
  })

  if (startResult.kind === 'NotFoundError') {
    window.showErrorMessage(startResult.message)
    return
  }

  subscriptions.push(startResult)

  qmlLintClient = startResult.value
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
      return window.showErrorMessage(result.message)
    case 'ExecError':
      return window.showErrorMessage(
        `${result.stderr}\n${result.stdout}\n${result.error.message ?? ''}`,
      )
    case 'StdErrError':
      return window.showErrorMessage(`${result.stderr}\n${result.stdout}`)
  }
}

export async function deactivate() {
  if (notNil(qmlLintClient)) await stopQmlLintClient(qmlLintClient)
}
