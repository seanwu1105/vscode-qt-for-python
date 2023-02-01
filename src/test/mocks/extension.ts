import type { Extension } from 'vscode'
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
