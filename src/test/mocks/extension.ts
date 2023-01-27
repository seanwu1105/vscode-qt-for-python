import type { Extension, WorkspaceConfiguration } from 'vscode'
import { ExtensionKind } from 'vscode'
import { URI } from 'vscode-uri'

export const MOCK_EXTENSION: Extension<any> = {
  id: '',
  extensionUri: URI.from({ scheme: 'mockScheme', path: 'mockPath' }),
  extensionPath: 'mockPath',
  extensionKind: ExtensionKind.UI,
  isActive: true,
  packageJSON: {},
  exports: {},
  activate: () => Promise.resolve({}),
}

export const MOCK_CONFIGURATION: WorkspaceConfiguration = {
  get: () => undefined,
  has: () => true,
  inspect: () => undefined,
  update: () => Promise.resolve(),
}
