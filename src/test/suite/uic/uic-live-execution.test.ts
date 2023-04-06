import * as assert from 'node:assert'
import * as path from 'node:path'
import { workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  E2E_TIMEOUT,
  forceDeleteFile,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
  waitFor,
} from '../test-utils'

suite('uic-live-execution/e2e', () => {
  const sampleFilenameNoExt = 'sample'

  const uiFilePath = path.resolve(
    TEST_ASSETS_PATH,
    'ui',
    `${sampleFilenameNoExt}.ui`,
  )

  let originalFullText: string

  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  setup(async function () {
    this.timeout(E2E_TIMEOUT)

    originalFullText = (
      await workspace.fs.readFile(URI.file(uiFilePath))
    ).toString()

    await removeGeneratedFile(sampleFilenameNoExt)
  })

  teardown(async function () {
    this.timeout(E2E_TIMEOUT)

    workspace.fs.writeFile(URI.file(uiFilePath), Buffer.from(originalFullText))

    await removeGeneratedFile(sampleFilenameNoExt)
  })

  test('should recompile when UI file changed', async () => {
    workspace.fs.writeFile(
      URI.file(uiFilePath),
      Buffer.from(
        originalFullText.replace(/My Window Title/gi, 'My New Window Title'),
      ),
    )

    await waitFor(async () => {
      const readResult = await workspace.fs.readFile(
        URI.file(
          path.resolve(TEST_ASSETS_PATH, 'ui', `${sampleFilenameNoExt}_ui.py`),
        ),
      )

      assert.ok(readResult.byteLength > 0)
    })
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function removeGeneratedFile(sampleFilenameNoExt: string) {
  return forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'ui', `${sampleFilenameNoExt}_ui.py`),
  )
}
