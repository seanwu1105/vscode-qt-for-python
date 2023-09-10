import * as assert from 'node:assert'
import * as path from 'node:path'
import type { TextDocument, TextEdit } from 'vscode'
import { WorkspaceEdit, commands, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  TEST_ASSETS_PATH,
  setupE2EEnvironment,
} from '../test-utils'

suite('format-qml/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('when a qml file is open', () => {
    const sampleFilenameNoExt = 'unformatted'
    let document: TextDocument

    setup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await workspace.openTextDocument(
        URI.file(
          path.resolve(TEST_ASSETS_PATH, 'qml', `${sampleFilenameNoExt}.qml`),
        ),
      )
      await window.showTextDocument(document)
    })

    teardown(async function () {
      this.timeout(E2E_TIMEOUT)
      await commands.executeCommand('workbench.action.closeActiveEditor')
    })

    test('should be able to run formatQml command', async () => {
      const originalContent = document.getText()
      const edits: TextEdit[] = await commands.executeCommand(
        'vscode.executeFormatDocumentProvider',
        document.uri,
      )

      const workspaceEdit = new WorkspaceEdit()
      workspaceEdit.set(document.uri, edits)
      await workspace.applyEdit(workspaceEdit)

      return assert.notDeepStrictEqual(originalContent, document.getText())
    }).timeout(E2E_TIMEOUT)
  })
}).timeout(E2E_TIMEOUT)
