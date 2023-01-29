import type { ExtensionContext } from 'vscode'
import { window } from 'vscode'
import { URI } from 'vscode-uri'
import { createUi } from './designer/create-ui'
import { editUi } from './designer/edit-ui'
import { compileResource } from './rcc/compile-resource'
import type { ErrorResult, SuccessResult } from './types'
import { compileUi } from './uic/compile-ui'
import { isNil } from './utils'

export const COMMANDS = [
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
] as const

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
