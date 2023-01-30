import { concatMap, defer, from, fromEventPattern, map, merge } from 'rxjs'
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
        .get<string>('path') ?? DEFAULT_PATH,
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

export function getPathFromConfig$({ tool, resource }: GetPathFromConfig$Args) {
  return getConfiguration$({
    section: `${EXTENSION_NAMESPACE}.${tool}`,
    key: 'path',
    defaultValue: DEFAULT_PATH,
    resource,
  }).pipe(map(path => resolvePredefinedVariables({ str: path, resource })))
}

type GetPathFromConfig$Args = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}

export const DEFAULT_PATH = ''

export function getOptionsFromConfig$({
  tool,
  resource,
}: GetOptionsFromConfig$Args) {
  return getConfiguration$<readonly string[]>({
    section: `${EXTENSION_NAMESPACE}.${tool}`,
    key: 'options',
    defaultValue: [],
    resource,
  }).pipe(
    concatMap(options => from(options)),
    map(option => option.split(' ')),
    concatMap(options => from(options)),
    map(option => resolvePredefinedVariables({ str: option, resource })),
  )
}

type GetOptionsFromConfig$Args = {
  readonly tool: SupportedTool
  readonly resource: URI | undefined
}

function getConfiguration$<T>({
  section,
  key,
  defaultValue,
  resource,
}: GetConfiguration$Args<T>) {
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

type GetConfiguration$Args<T> = {
  readonly section: string
  readonly key: string
  readonly defaultValue: T
  readonly resource: URI | undefined
}
