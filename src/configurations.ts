import { workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from './constants'
import { resolvePredefinedVariables } from './predefined-variable-resolver'
import type { CommandArgs } from './run'
import type { SupportedTool } from './types'

export function getPathFromConfig({ tool, resource }: GetPathFromConfig) {
  return resolvePredefinedVariables({
    str:
      workspace
        .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, resource)
        .get<string>('path') ?? '',
    resource,
  })
}

type GetPathFromConfig = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}

export function getOptionsFromConfig({
  tool,
  resource,
}: GetOptionsFromConfig): CommandArgs {
  return (
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, resource)
      .get<readonly string[]>('options') ?? []
  )
    .map(str => str.split(' '))
    .flat()
    .map(str => resolvePredefinedVariables({ str, resource }))
}

type GetOptionsFromConfig = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}
