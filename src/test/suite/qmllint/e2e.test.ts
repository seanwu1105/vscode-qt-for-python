import * as assert from 'node:assert'
import * as path from 'node:path'
import type { CodeAction, Range, TextDocument } from 'vscode'
import { commands, languages, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
  waitFor,
} from '../test-utils'

suite('qmllint/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('missing_import.qml', () => {
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('missing_import.qml')
    })

    test('should contain diagnostics', async () =>
      waitFor(async () =>
        withTriggeringLinter(document, () =>
          assert.ok(languages.getDiagnostics(document.uri).length > 0),
        ),
      )).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('pass.qml', () => {
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('pass.qml')
    })

    test('should not contain diagnostic', async () =>
      waitFor(async () =>
        withTriggeringLinter(document, () =>
          assert.ok(languages.getDiagnostics(document.uri).length === 0),
        ),
      )).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('multiline_string.qml', () => {
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('multiline_string.qml')
    })

    test('should contain diagnostics', async () =>
      waitFor(async () =>
        withTriggeringLinter(document, () =>
          assert.ok(languages.getDiagnostics(document.uri).length > 0),
        ),
      )).timeout(E2E_TIMEOUT)

    test('should contain code actions', async () =>
      waitFor(async () => {
        const diagnostics = languages.getDiagnostics(document.uri)
        const codeActions = await Promise.all(
          diagnostics.map(diagnostic =>
            getCodeActions(document.uri, diagnostic.range),
          ),
        )
        withTriggeringLinter(document, () => assert.ok(codeActions.length > 0))
      })).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function openAndShowTestQmlFile(filename: string) {
  const document = await workspace.openTextDocument(
    URI.file(path.resolve(TEST_ASSETS_PATH, 'qml', filename)),
  )
  await window.showTextDocument(document)
  return document
}

async function withTriggeringLinter(
  document: TextDocument,
  checkCallback: () => void,
) {
  try {
    checkCallback()
  } catch (e) {
    // Trigger the linter again to wait for Python interpreter discovering.
    await manuallySaveDocument(document)
    throw e
  }
}

async function manuallySaveDocument(document: TextDocument) {
  await window.showTextDocument(document)
  await commands.executeCommand('workbench.action.files.save')
}

async function getCodeActions(uri: URI, range: Range): Promise<CodeAction[]> {
  return await commands.executeCommand(
    'vscode.executeCodeActionProvider',
    uri,
    range,
  )
}
