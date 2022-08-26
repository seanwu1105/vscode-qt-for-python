import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Diagnostic } from 'vscode'
import { commands, extensions, languages, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { notNil } from '../../../utils'

const E2E_TIMEOUT = 1000000
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DEFAULT_SLEEP_TIME = process.env['CI'] === 'true' ? 20000 : 1000

suite('qmllint/e2e', () => {
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
    let diagnostics: readonly Diagnostic[]

    suiteSetup(async function () {
      this.timeout(E2E_TIMEOUT)

      const document = await openAndShowTestFile('missing_import.qml')
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

      const document = await openAndShowTestFile('pass.qml')
      await sleep()
      diagnostics = languages.getDiagnostics(document.uri)
    })

    test('should not contain diagnostic', async () =>
      assert.ok(diagnostics.length === 0)).timeout(E2E_TIMEOUT)
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

async function sleep(ms = DEFAULT_SLEEP_TIME) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
