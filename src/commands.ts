import type { ExtensionContext, Uri } from 'vscode'
import { window } from 'vscode'
import { URI } from 'vscode-uri'
import { compileResource } from './rcc/compile'
import type { ErrorResult, SuccessResult } from './types'
import { compileUi } from './uic/compile'
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
] as const

export type CommandDeps = Pick<ExtensionContext, 'extensionPath'>

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
  | SuccessResult<Uri>
  | ErrorResult<'Type'>
