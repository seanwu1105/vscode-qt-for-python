import { workspace } from 'vscode'
import type { DocumentUri } from 'vscode-languageclient'
import { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from './constants'
import { resolvePredefinedVariables } from './predefined-variable-resolver'
import type { SupportedTool } from './types'

export function getPathFromConfig({ tool, resource }: GetPathFromConfig) {
  return resolvePredefinedVariables(
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, URI.parse(resource))
      .get<string>('path') ?? '',
  )
}

export function getOptionsFromConfig({ tool, resource }: GetPathFromConfig) {
  return (
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`, URI.parse(resource))
      .get<readonly string[]>('options') ?? []
  ).map(resolvePredefinedVariables)
}

type GetPathFromConfig = {
  readonly tool: SupportedTool
  readonly resource: DocumentUri
}
