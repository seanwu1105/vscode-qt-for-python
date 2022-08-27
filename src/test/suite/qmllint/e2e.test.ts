import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Diagnostic } from 'vscode'
import { languages, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  sleep,
  TEST_ASSETS_PATH,
} from '../utils'

suite('qmllint/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('missing_import.qml', () => {
    let diagnostics: readonly Diagnostic[]

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      const document = await openAndShowTestQmlFile('missing_import.qml')
      await sleep()
      diagnostics = languages.getDiagnostics(document.uri)
    })

    test('should contain diagnostics', async () =>
      assert.ok(diagnostics.length > 0)).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('pass.qml', () => {
    let diagnostics: readonly Diagnostic[]

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      const document = await openAndShowTestQmlFile('pass.qml')
      await sleep()
      diagnostics = languages.getDiagnostics(document.uri)
    })

    test('should not contain diagnostic', async () =>
      assert.ok(diagnostics.length === 0)).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function openAndShowTestQmlFile(filename: string) {
  const document = await workspace.openTextDocument(
    URI.file(path.resolve(TEST_ASSETS_PATH, 'qml', filename)),
  )
  await window.showTextDocument(document)
  return document
}
