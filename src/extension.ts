import type { ExtensionContext } from 'vscode'
import type { LanguageClient } from 'vscode-languageclient/node'
import {
  startClient as startQmllintClient,
  stopClient as stopQmllintClient,
} from './qmllint/client'
import { notNil } from './utils'

let qmllintClient: LanguageClient | undefined = undefined

export async function activate({
  asAbsolutePath,
  extensionPath,
}: ExtensionContext) {
  qmllintClient = await startQmllintClient({ asAbsolutePath, extensionPath })
}

export async function deactivate() {
  if (notNil(qmllintClient)) await stopQmllintClient(qmllintClient)
}
