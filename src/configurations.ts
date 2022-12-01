import { workspace } from 'vscode'
import type { DocumentUri } from 'vscode-languageclient'
import { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from './constants'
import { resolvePredefinedVariables } from './predefined-variable-resolver'
import type { CommandArgs } from './run'
import type { SupportedTool } from './types'

export function getPathFromConfig({ tool, resource }: GetPathFromConfig) {
  return resolvePredefinedVariables({
    str:
      workspace
        .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, URI.parse(resource))
        .get<string>('path') ?? '',
    resource: URI.parse(resource),
  })
}

export function getOptionsFromConfig({
  tool,
  resource,
}: GetPathFromConfig): CommandArgs {
  return (
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, URI.parse(resource))
      .get<readonly string[]>('options') ?? []
  )
    .map(str => str.split(' '))
    .flat()
    .map(str =>
      resolvePredefinedVariables({ str, resource: URI.parse(resource) }),
    )
}

type GetPathFromConfig = {
  readonly tool: SupportedTool
  readonly resource: DocumentUri
}
