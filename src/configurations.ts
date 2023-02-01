import { defer, fromEventPattern, map, merge } from 'rxjs'
import { workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from './constants'
import { resolvePredefinedVariables } from './predefined-variable-resolver'
import type { CommandArgs } from './run'
import type { SupportedTool } from './types'

export function getPathFromConfig$({ tool, resource }: GetPathFromConfig$Args) {
  return getConfiguration$({
    section: `${EXTENSION_NAMESPACE}.${tool}`,
    key: 'path',
    defaultValue: DEFAULT_PATH,
    resource,
  }).pipe(map(path => resolvePredefinedVariables({ str: path, resource })))
}

export const DEFAULT_PATH = ''

type GetPathFromConfig$Args = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}

export function getOptionsFromConfig$({
  tool,
  resource,
}: GetOptionsFromConfigArgs) {
  return getConfiguration$<CommandArgs>({
    section: `${EXTENSION_NAMESPACE}.${tool}`,
    key: 'options',
    defaultValue: DEFAULT_OPTIONS,
    resource,
  }).pipe(
    map(options =>
      options
        .map(option => option.split(' '))
        .flat()
        .map(str => resolvePredefinedVariables({ str, resource })),
    ),
  )
}

export const DEFAULT_OPTIONS = []

type GetOptionsFromConfigArgs = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}

export function getEnabledFromConfig$({
  tool,
  resource,
}: GetEnabledFromConfigArgs) {
  return getConfiguration$<boolean>({
    section: `${EXTENSION_NAMESPACE}.${tool}`,
    key: 'enabled',
    defaultValue: DEFAULT_ENABLED,
    resource,
  })
}

export const DEFAULT_ENABLED = true

type GetEnabledFromConfigArgs = {
  readonly tool: SupportedSwitchableTool
  readonly resource: URI | undefined
}

type SupportedSwitchableTool = Extract<SupportedTool, 'qmlls'>

export function getConfiguration$<T>({
  section,
  key,
  defaultValue,
  resource,
}: GetConfigurationArgs<T>) {
  return merge(
    defer(
      async () =>
        workspace.getConfiguration(section, resource).get<T>(key) ??
        defaultValue,
    ),
    fromEventPattern<T>(
      handler =>
        workspace.onDidChangeConfiguration(e => {
          if (e.affectsConfiguration(`${section}.${key}`, resource))
            handler(
              workspace.getConfiguration(section, resource).get<T>(key) ??
                defaultValue,
            )
        }),
      (_, disposable) => disposable.dispose(),
    ),
  )
}

type GetConfigurationArgs<T> = {
  readonly section: string
  readonly key: string
  readonly defaultValue: T
  readonly resource: URI | undefined
}
