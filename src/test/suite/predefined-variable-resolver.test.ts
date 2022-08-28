import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import type { TextDocument, TextEditor } from 'vscode'
import { env, Selection, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { resolvePredefinedVariables } from '../../predefined-variable-resolver'
import { notNil } from '../../utils'
import {
  E2E_TIMEOUT,
  setupE2EEnvironment,
  TEST_ASSETS_PATH,
  TEST_WORKSPACE_PATH,
} from './utils'

suite('predefined variable resolver', () => {
  const testFilePath = path.resolve(
    TEST_ASSETS_PATH,
    'predefined-variable-resolver-test.txt',
  )

  let document: TextDocument

  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)
    await setupE2EEnvironment()
  })

  setup(async function () {
    this.timeout(E2E_TIMEOUT)

    document = await workspace.openTextDocument(URI.file(testFilePath))
    await window.showTextDocument(document)
  })

  test('should replace all', () =>
    test('userHome', () =>
      assert.deepStrictEqual(
        resolvePredefinedVariables('${userHome} ${userHome}'),
        `${os.homedir()} ${os.homedir()}`,
      )))

  test('userHome', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${userHome}'),
      os.homedir(),
    ))

  test('workspaceFolder', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${workspaceFolder}'),
      TEST_WORKSPACE_PATH,
    ))

  test('workspaceFolderBasename', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${workspaceFolderBasename}'),
      `${path.basename(TEST_WORKSPACE_PATH)}`,
    ))

  test('file', () =>
    assert.deepStrictEqual(resolvePredefinedVariables('${file}'), testFilePath))

  test('fileWorkspaceFolder', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileWorkspaceFolder}'),
      TEST_WORKSPACE_PATH,
    ))

  test('relativeFile', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${relativeFile}'),
      path.relative(TEST_WORKSPACE_PATH, testFilePath),
    ))

  test('relativeFileDirname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${relativeFileDirname}'),
      path.dirname(path.relative(TEST_WORKSPACE_PATH, testFilePath)),
    ))

  test('fileBasename', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileBasename}'),
      path.basename(testFilePath),
    ))

  test('fileBasenameNoExtension', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileBasenameNoExtension}'),
      path.parse(testFilePath).name,
    ))

  test('fileDirname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileDirname}'),
      path.dirname(testFilePath),
    ))

  test('fileExtname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileExtname}'),
      path.parse(testFilePath).ext,
    ))

  suite('lineNumber', () => {
    let editor: TextEditor

    setup(() => {
      assert.ok(notNil(window.activeTextEditor))
      editor = window.activeTextEditor
    })

    test('should get cursor line number', () => {
      const expectedLineNumber = 3

      editor.selection = new Selection(
        expectedLineNumber - 1,
        0,
        expectedLineNumber - 1,
        0,
      )

      assert.deepStrictEqual(
        resolvePredefinedVariables('${lineNumber}'),
        `${expectedLineNumber}`,
      )
    }).timeout(E2E_TIMEOUT)
  }).timeout(E2E_TIMEOUT)

  suite('selectedText', () => {
    let editor: TextEditor

    setup(() => {
      assert.ok(notNil(window.activeTextEditor))
      editor = window.activeTextEditor
    })

    test('should get selected text', () => {
      const endCharacter = 11
      editor.selection = new Selection(1, 0, 1, endCharacter)

      assert.deepStrictEqual(
        resolvePredefinedVariables('${selectedText}'),
        `second line`,
      )
    })
  })

  test('execPath', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${execPath}'),
      env.appRoot,
    ))

  test('pathSeparator', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${pathSeparator}'),
      path.sep,
    ))

  test('env:HOME', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${env:HOME}'),
      process.env['HOME'],
    ))
})
