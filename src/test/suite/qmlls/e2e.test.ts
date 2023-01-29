import * as assert from 'node:assert'
import * as path from 'node:path'
import type { CompletionList, Diagnostic, TextDocument } from 'vscode'
import { commands, languages, Position, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
  waitFor,
} from '../test-utils'

suite('qmlls/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('when open missing_import.qml', () => {
    let diagnostics: readonly Diagnostic[]
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('missing_import.qml')
    })

    test('should contain diagnostics', async () =>
      waitFor(() => {
        diagnostics = languages.getDiagnostics(document.uri)
        assert.ok(diagnostics.length > 0)
      })).timeout(E2E_TIMEOUT)

    suite('when trigger completion in first line', () => {
      const position = new Position(0, 0)

      test('should contain Qt completion items', async () => {
        const itemResolveCount = 1

        const completionList: CompletionList = await commands.executeCommand(
          'vscode.executeCompletionItemProvider',
          document.uri,
          position,
          undefined,
          itemResolveCount,
        )

        assert.ok(completionList.items.map(i => i.label).includes('Qt'))
      }).timeout(E2E_TIMEOUT)
    }).timeout(E2E_TIMEOUT)

    suite('when disable qmlls', () => {
      suiteSetup(async function () {
        this.timeout(E2E_TIMEOUT)

        await workspace
          .getConfiguration('qtForPython.qmlls')
          .update('enabled', false)
      })

      suiteTeardown(async function () {
        this.timeout(E2E_TIMEOUT)

        await workspace
          .getConfiguration('qtForPython.qmlls')
          .update('enabled', undefined)
      })

      test('should not contain diagnostic', async () =>
        waitFor(() => {
          diagnostics = languages.getDiagnostics(document.uri)
          assert.ok(diagnostics.length === 0)
        })).timeout(E2E_TIMEOUT)

      suite('when trigger completion in first line', () => {
        const position = new Position(0, 0)

        test('should not contain Qt completion item', async () => {
          const completionList: CompletionList = await commands.executeCommand(
            'vscode.executeCompletionItemProvider',
            document.uri,
            position,
          )

          assert.ok(!completionList.items.map(i => i.label).includes('Qt'))
        }).timeout(E2E_TIMEOUT)
      }).timeout(E2E_TIMEOUT)

      suite('when enable qmlls again', () => {
        suiteSetup(async function () {
          this.timeout(E2E_TIMEOUT)

          await workspace
            .getConfiguration('qtForPython.qmlls')
            .update('enabled', true)
        })

        suiteTeardown(async function () {
          this.timeout(E2E_TIMEOUT)

          await workspace
            .getConfiguration('qtForPython.qmlls')
            .update('enabled', undefined)
        })

        test('should contain diagnostic again', async () =>
          waitFor(() => {
            diagnostics = languages.getDiagnostics(document.uri)
            assert.ok(diagnostics.length > 0)
          })).timeout(E2E_TIMEOUT)

        suite('when trigger completion in first line', () => {
          const position = new Position(0, 0)

          test('should contain Qt completion item again', async () => {
            const completionList: CompletionList =
              await commands.executeCommand(
                'vscode.executeCompletionItemProvider',
                document.uri,
                position,
              )

            assert.ok(completionList.items.map(i => i.label).includes('Qt'))
          }).timeout(E2E_TIMEOUT)
        }).timeout(E2E_TIMEOUT)
      }).timeout(E2E_TIMEOUT)
    }).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('when open pass.qml', () => {
    let diagnostics: readonly Diagnostic[]
    let document: TextDocument

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestQmlFile('pass.qml')
    })

    test('should not contain diagnostic', async () =>
      waitFor(() => {
        diagnostics = languages.getDiagnostics(document.uri)
        assert.ok(diagnostics.length === 0)
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
