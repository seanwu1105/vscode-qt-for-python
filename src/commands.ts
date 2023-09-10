import { fromEventPattern } from 'rxjs'
import type { ExtensionContext } from 'vscode'
import { commands, Disposable } from 'vscode'
import { EXTENSION_NAMESPACE } from './constants'
import { createUi } from './designer/create-ui'
import { editUi } from './designer/edit-ui'
import { editTranslations } from './linguist/edit-translations'
import { compileTranslations } from './lrelease/compile-translation'
import { extractTranslations } from './lupdate/extract-translation'
import { previewQml } from './qml/preview-qml'
import { compileResource } from './rcc/compile-resource'
import { compileUi } from './uic/compile-ui'

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
  {
    name: 'compileTranslations',
    callback: compileTranslations,
  },
] as const

type CommandCallbackValue = Awaited<
  ReturnType<typeof COMMANDS[number]['callback']>
>

export type CommandDeps = Pick<ExtensionContext, 'extensionUri'>
