import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Diagnostic, TextDocument } from 'vscode'
import { languages, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  manuallySaveDocument,
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
    let diagnostics: readonly Diagnostic[]
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('missing_import.qml')
    })

    test('shouasync async ld contain diagnostics', async () =>
      waitFor(async () => {
        diagnostics = languages.getDiagnostics(document.uri)
        try {
          assert.ok(diagnostics.length > 0)
        } catch (e) {
          // Trigger the linter again to wait for Python interpreter discovering.
          await manuallySaveDocument(document)
          throw e
        }
      })).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('pass.qml', () => {
    let diagnostics: readonly Diagnostic[]
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('pass.qml')
    })

    test('should not contain diagnostic', async () =>
      waitFor(async () => {
        diagnostics = languages.getDiagnostics(document.uri)
        try {
          assert.ok(diagnostics.length === 0)
        } catch (e) {
          // Trigger the linter again to wait for Python interpreter discovering.
          await manuallySaveDocument(document)
          throw e
        }
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
