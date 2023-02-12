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

suite('rcc-live-execution/e2e', () => {
  const sampleQrcFilenameNoExt = 'sample'

  let originalFullText: string

  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  setup(async function () {
    this.timeout(E2E_TIMEOUT)
    await removeGeneratedFile(sampleQrcFilenameNoExt)
  })

  teardown(async function () {
    this.timeout(E2E_TIMEOUT)
    await removeGeneratedFile(sampleQrcFilenameNoExt)
  })

  suite('when qrc file changed', () => {
    const qrcFilePath = path.resolve(
      TEST_ASSETS_PATH,
      'qrc',
      `${sampleQrcFilenameNoExt}.qrc`,
    )

    setup(async function () {
      this.timeout(E2E_TIMEOUT)
      originalFullText = (
        await workspace.fs.readFile(URI.file(qrcFilePath))
      ).toString()
    })

    teardown(function () {
      this.timeout(E2E_TIMEOUT)
      workspace.fs.writeFile(
        URI.file(qrcFilePath),
        Buffer.from(originalFullText),
      )
    })

    test('should recompile', async () => {
      workspace.fs.writeFile(
        URI.file(qrcFilePath),
        Buffer.from(originalFullText.replace(/<file>rc0.txt<\/file>/gi, '')),
      )

      await waitFor(async () => {
        const readResult = await workspace.fs.readFile(
          URI.file(
            path.resolve(
              TEST_ASSETS_PATH,
              'qrc',
              `rc_${sampleQrcFilenameNoExt}.py`,
            ),
          ),
        )

        assert.ok(readResult.byteLength > 0)
      })
    }).timeout(E2E_TIMEOUT)
  })

  suite('when a resource file changed', () => {
    const sampleResourceFilename = 'rc1.txt'

    const resourceFilePath = path.resolve(
      TEST_ASSETS_PATH,
      'qrc',
      sampleResourceFilename,
    )

    setup(async function () {
      this.timeout(E2E_TIMEOUT)
      originalFullText = (
        await workspace.fs.readFile(URI.file(resourceFilePath))
      ).toString()
    })

    teardown(function () {
      this.timeout(E2E_TIMEOUT)
      workspace.fs.writeFile(
        URI.file(resourceFilePath),
        Buffer.from(originalFullText),
      )
    })

    test('should recompile', async () => {
      workspace.fs.writeFile(
        URI.file(resourceFilePath),
        Buffer.from(originalFullText.replace(/hello/gi, 'world')),
      )

      await waitFor(async () => {
        const readResult = await workspace.fs.readFile(
          URI.file(
            path.resolve(
              TEST_ASSETS_PATH,
              'qrc',
              `rc_${sampleQrcFilenameNoExt}.py`,
            ),
          ),
        )
        assert.ok(readResult.byteLength > 0)
      })
    })
  })
}).timeout(E2E_TIMEOUT)

async function removeGeneratedFile(sampleFilenameNoExt: string) {
  await forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'qrc', `rc_${sampleFilenameNoExt}.py`),
  )
}
