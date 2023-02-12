import * as assert from 'node:assert'
import * as path from 'node:path'
import type { ColorInformation, TextDocument } from 'vscode'
import { commands, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
} from '../test-utils'

suite('qss/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('color picker', () => {
    suite('when open QLabel.qss', () => {
      let document: TextDocument

      suiteSetup(async function () {
        this.timeout(E2E_TIMEOUT)

        document = await openAndShowTestQssFile('QLabel.qss')
      })

      test('should contain color info', async () => {
        const colorInformationList: ColorInformation[] =
          await commands.executeCommand(
            'vscode.executeDocumentColorProvider',
            document.uri,
          )

        assert.ok(colorInformationList.length > 0)
        colorInformationList.forEach(i => {
          assert.strictEqual(i.color.red, 1)
          assert.strictEqual(i.color.green, 1)
          assert.strictEqual(i.color.blue, 0)
          assert.strictEqual(i.color.alpha, 1)
        })
      }).timeout(E2E_TIMEOUT)
    }).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function openAndShowTestQssFile(fileName: string) {
  const document = await workspace.openTextDocument(
    URI.file(path.resolve(TEST_ASSETS_PATH, 'qss', fileName)),
  )
  await window.showTextDocument(document)
  return document
}
