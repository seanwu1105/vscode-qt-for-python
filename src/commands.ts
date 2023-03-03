import { fromEventPattern } from 'rxjs'
import type { ExtensionContext } from 'vscode'
import { commands, Disposable, window } from 'vscode'
import { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from './constants'
import { createUi } from './designer/create-ui'
import { editUi } from './designer/edit-ui'
import { editTranslations } from './linguist/edit-translations'
import { extractTranslations } from './lupdate/extract-translation'
import { previewQml } from './qml/preview-qml'
import { compileResource } from './rcc/compile-resource'
import type { ErrorResult, SuccessResult } from './types'
import { compileUi } from './uic/compile-ui'
import { isNil } from './utils'

export function registerCommands$({ extensionUri }: RegisterCommandsArgs) {
  return fromEventPattern<CommandCallbackValue>(
    callback =>
      Disposable.from(
        ...COMMANDS.map(command =>
          commands.registerCommand(
            `${EXTENSION_NAMESPACE}.${command.name}`,
            async (...args) =>
              callback(await command.callback({ extensionUri }, ...args)),
          ),
        ),
      ),

    (_, disposable) => disposable.dispose(),
  )
}

type RegisterCommandsArgs = Pick<ExtensionContext, 'extensionUri'>

const COMMANDS = [
  {
    name: 'compileResource',
    callback: compileResource,
  },
  {
    name: 'compileUi',
    callback: compileUi,
  },
  {
    name: 'createUi',
    callback: createUi,
  },
  {
    name: 'editUi',
    callback: editUi,
  },
  {
    name: 'previewQml',
    callback: previewQml,
  },
  {
    name: 'extractTranslations',
    callback: extractTranslations,
  },
  {
    name: 'editTranslations',
    callback: editTranslations,
  },
] as const

type CommandCallbackValue = Awaited<
  ReturnType<typeof COMMANDS[number]['callback']>
>

export type CommandDeps = Pick<ExtensionContext, 'extensionUri'>

export function getTargetDocumentUri(
  ...args: readonly any[]
): GetTargetDocumentUriResult {
  if (isNil(args[0])) {
    const activeDocument = window.activeTextEditor?.document.uri

    if (isNil(activeDocument))
      return { kind: 'TypeError', message: 'No active document.' }

    return { kind: 'Success', value: activeDocument }
  }

  if (!URI.isUri(args[0]))
    return {
      kind: 'TypeError',
      message: `Invalid argument: ${JSON.stringify(args[0])}`,
    }

  return { kind: 'Success', value: args[0] }
}

export type GetTargetDocumentUriResult =
  | SuccessResult<URI>
  | ErrorResult<'Type'>
