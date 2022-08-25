import { workspace } from 'vscode'
import type { DocumentUri } from 'vscode-languageclient'
import { URI } from 'vscode-uri'
import { resolvePredefinedVariables } from './predefined-variable-resolver'

export function getPathFromConfig({ tool, resource }: GetPathFromConfig) {
  return resolvePredefinedVariables(
    workspace
      .getConfiguration(
        `${CONFIGURATION_NAMESPACE}.${tool}`,
        URI.parse(resource),
      )
      .get<string>('path') ?? '',
  )
}

export function getOptionsFromConfig({ tool, resource }: GetPathFromConfig) {
  return (
    workspace
      .getConfiguration(
        `${CONFIGURATION_NAMESPACE}.${tool}`,
        URI.parse(resource),
      )
      .get<readonly string[]>('options') ?? []
  ).map(resolvePredefinedVariables)
}

type GetPathFromConfig = {
  readonly tool: SupportedTool
  readonly resource: DocumentUri
}

export const CONFIGURATION_NAMESPACE = 'qtForPython'
export type SupportedTool = 'qmllint'
