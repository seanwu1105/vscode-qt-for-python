import * as assert from 'node:assert'
import * as path from 'node:path'
import type { TextDocument } from 'vscode'
import { commands, extensions, languages, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { notNil } from '../../../utils'
import { sleep, waitFor } from '../../utils'

const E2E_TIMEOUT = 1000000

suite('qmllint/e2e', () => {
  let document: TextDocument

  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)

    await sleep() // wait for extension to load Extension Gallery

    await commands.executeCommand(
      'workbench.extensions.installExtension',
      'ms-python.python',
    )

    await commands.executeCommand(
      'vscode.openFolder',
      URI.file(path.resolve(__dirname, '..', '..', '..', '..', 'python')),
    )
  })

  setup(async function () {
    this.timeout(E2E_TIMEOUT)

    const extension = extensions.getExtension('seanwu.vscode-qt-for-python')
    assert.ok(notNil(extension))

    await extension.activate()
  })

  suite('missing_import.qml', () => {
    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestFile('missing_import.qml')
    })

    test('should contain diagnostics', async () =>
      waitFor(() =>
        assert.ok(languages.getDiagnostics(document.uri).length > 0),
      )).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('pass.qml', () => {
    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      document = await openAndShowTestFile('pass.qml')
    })

    test('should not contain diagnostic', async () =>
      waitFor(() =>
        assert.ok(languages.getDiagnostics(document.uri).length === 0),
      )).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function openAndShowTestFile(filename: string) {
  const document = await workspace.openTextDocument(
    URI.file(
      path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'python',
        'tests',
        'assets',
        filename,
      ),
    ),
  )
  await window.showTextDocument(document)
  return document
}
