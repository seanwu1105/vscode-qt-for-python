import * as assert from 'node:assert'
import * as path from 'node:path'
import { commands, languages, window, workspace } from 'vscode'
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
    suite(
      'when a Python file is open and run extractTranslations command',
      () => {
        const sampleFilenameNoExt = 'sample'

        setup(async function () {
          this.timeout(E2E_TIMEOUT)

          await removeGeneratedTranslationFile(sampleFilenameNoExt)

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

          await commands.executeCommand(
            `${EXTENSION_NAMESPACE}.extractTranslations`,
          )
        })

        teardown(async function () {
          this.timeout(E2E_TIMEOUT)
          await removeGeneratedTranslationFile(sampleFilenameNoExt)
        })

        test('should extract translations to file', async () =>
          waitFor(async () => {
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
          })).timeout(E2E_TIMEOUT)

        suite(
          'when a translation file is open and run compileTranslations command',
          () => {
            setup(async function () {
              this.timeout(E2E_TIMEOUT)

              await removeGeneratedCompiledTranslationFile(sampleFilenameNoExt)

              const document = await workspace.openTextDocument(
                URI.file(
                  path.resolve(
                    TEST_ASSETS_PATH,
                    'linguist',
                    `${sampleFilenameNoExt}.ts`,
                  ),
                ),
              )
              await window.showTextDocument(document)
              await languages.setTextDocumentLanguage(document, 'xml')

              await commands.executeCommand(
                `${EXTENSION_NAMESPACE}.compileTranslations`,
              )
            })

            teardown(async function () {
              this.timeout(E2E_TIMEOUT)
              await removeGeneratedCompiledTranslationFile(sampleFilenameNoExt)
            })

            test('should compile translations to file', async () =>
              waitFor(async () => {
                const readResult = await workspace.fs.readFile(
                  URI.file(
                    path.resolve(
                      TEST_ASSETS_PATH,
                      'linguist',
                      `${sampleFilenameNoExt}.qm`,
                    ),
                  ),
                )

                assert.ok(readResult.byteLength > 0)
              })).timeout(E2E_TIMEOUT)
          },
        ).timeout(E2E_TIMEOUT)
      },
    ).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function removeGeneratedTranslationFile(sampleFilenameNoExt: string) {
  return forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'linguist', `${sampleFilenameNoExt}.ts`),
  )
}

async function removeGeneratedCompiledTranslationFile(
  sampleFilenameNoExt: string,
) {
  return forceDeleteFile(
    path.resolve(TEST_ASSETS_PATH, 'linguist', `${sampleFilenameNoExt}.qm`),
  )
}
