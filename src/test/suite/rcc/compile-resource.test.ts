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

suite('compile-resource/e2e', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  test('should include the command', async () =>
    assert.ok(
      (await commands.getCommands(true)).includes(
        `${EXTENSION_NAMESPACE}.compileResource`,
      ),
    ))

  suite('command palette', () => {
    suite('when a qrc file is open', () => {
      const sampleFilenameNoExt = 'sample'

      setup(async function () {
        this.timeout(E2E_TIMEOUT)

        await removeGeneratedFile(sampleFilenameNoExt)

        const document = await workspace.openTextDocument(
          URI.file(
            path.resolve(TEST_ASSETS_PATH, 'qrc', `${sampleFilenameNoExt}.qrc`),
          ),
        )
        await window.showTextDocument(document)
      })

      teardown(async function () {
        this.timeout(E2E_TIMEOUT)
        await removeGeneratedFile(sampleFilenameNoExt)
      })

      test('should run command', async () => {
        await commands.executeCommand(`${EXTENSION_NAMESPACE}.compileResource`)

        return waitFor(async () => {
          const readResult = await workspace.fs.readFile(
            URI.file(
              path.resolve(
                TEST_ASSETS_PATH,
                'qrc',
                `rc_${sampleFilenameNoExt}.py`,
              ),
            ),
          )

          assert.ok(readResult.byteLength > 0)
        })
      }).timeout(E2E_TIMEOUT)
    })
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function removeGeneratedFile(sampleFilenameNoExt: string) {
  await forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'qrc', `rc_${sampleFilenameNoExt}.py`),
  )
}
