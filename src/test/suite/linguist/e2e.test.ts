import * as assert from 'node:assert'
import * as path from 'node:path'
import { commands, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { EXTENSION_NAMESPACE } from '../../../constants'
import {
  E2E_TIMEOUT,
  forceDeleteFile,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
  waitFor,
} from '../test-utils'

suite('linguist/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  suite('command palette', () => {
    suite('when a Python file is open', () => {
      const sampleFilenameNoExt = 'sample'

      setup(async function () {
        this.timeout(E2E_TIMEOUT)

        await removeGeneratedFile(sampleFilenameNoExt)

        const document = await workspace.openTextDocument(
          URI.file(
            path.resolve(
              TEST_ASSETS_PATH,
              'linguist',
              `${sampleFilenameNoExt}.py`,
            ),
          ),
        )
        await window.showTextDocument(document)
      })

      teardown(async function () {
        this.timeout(E2E_TIMEOUT)
        await removeGeneratedFile(sampleFilenameNoExt)
      })

      test('should run lupdate command', async () => {
        await commands.executeCommand(`${EXTENSION_NAMESPACE}.lupdate`)

        return waitFor(async () => {
          const readResult = await workspace.fs.readFile(
            URI.file(
              path.resolve(
                TEST_ASSETS_PATH,
                'linguist',
                `${sampleFilenameNoExt}.ts`,
              ),
            ),
          )

          assert.ok(readResult.byteLength > 0)
        })
      }).timeout(E2E_TIMEOUT)
    }).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function removeGeneratedFile(sampleFilenameNoExt: string) {
  return forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'linguist', `${sampleFilenameNoExt}.ts`),
  )
}
