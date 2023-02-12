import * as assert from 'node:assert'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  sleep,
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
      originalFullText = fs.readFileSync(qrcFilePath, { encoding: 'utf-8' })
    })

    teardown(function () {
      this.timeout(E2E_TIMEOUT)
      fs.writeFileSync(qrcFilePath, originalFullText, { encoding: 'utf-8' })
    })

    test('should recompile', async () => {
      fs.writeFileSync(
        qrcFilePath,
        originalFullText.replace(/<file>rc0.txt<\/file>/gi, ''),
      )

      await waitFor(() =>
        assert.ok(
          fs.existsSync(
            path.resolve(
              TEST_ASSETS_PATH,
              'qrc',
              `rc_${sampleQrcFilenameNoExt}.py`,
            ),
          ),
        ),
      )
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
      originalFullText = fs.readFileSync(resourceFilePath, {
        encoding: 'utf-8',
      })
    })

    teardown(function () {
      this.timeout(E2E_TIMEOUT)
      fs.writeFileSync(resourceFilePath, originalFullText, {
        encoding: 'utf-8',
      })
    })

    test('should recompile', async () => {
      fs.writeFileSync(
        resourceFilePath,
        originalFullText.replace(/hello/gi, 'world'),
      )

      await waitFor(() =>
        assert.ok(
          fs.existsSync(
            path.resolve(
              TEST_ASSETS_PATH,
              'qrc',
              `rc_${sampleQrcFilenameNoExt}.py`,
            ),
          ),
        ),
      )
    })
  })
}).timeout(E2E_TIMEOUT)

async function removeGeneratedFile(sampleFilenameNoExt: string) {
  return waitFor(async () => {
    await sleep() // Wait for the file to be created asynchronously by the extension
    fs.rmSync(
      path.resolve(TEST_ASSETS_PATH, 'qrc', `rc_${sampleFilenameNoExt}.py`),
      { force: true, recursive: true },
    )
    assert.ok(
      !fs.existsSync(
        path.resolve(TEST_ASSETS_PATH, 'qrc', `rc_${sampleFilenameNoExt}.py`),
      ),
    )
  })
}
