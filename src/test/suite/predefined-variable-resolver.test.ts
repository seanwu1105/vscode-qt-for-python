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

  function resolve(str: string) {
    return resolvePredefinedVariables({ str, resource: document.uri })
  }

  test('should replace all', () =>
    test('userHome', () =>
      assert.deepStrictEqual(
        resolve('${userHome} ${userHome}'),
        `${os.homedir()} ${os.homedir()}`,
      )))

  test('userHome', () =>
    assert.deepStrictEqual(resolve('${userHome}'), os.homedir()))

  test('workspaceFolder', () =>
    assert.deepStrictEqual(resolve('${workspaceFolder}'), TEST_WORKSPACE_PATH))

  test('workspaceFolderBasename', () =>
    assert.deepStrictEqual(
      resolve('${workspaceFolderBasename}'),
      `${path.basename(TEST_WORKSPACE_PATH)}`,
    ))

  test('file', () => assert.deepStrictEqual(resolve('${file}'), testFilePath))

  test('fileWorkspaceFolder', () =>
    assert.deepStrictEqual(
      resolve('${fileWorkspaceFolder}'),
      TEST_WORKSPACE_PATH,
    ))

  test('relativeFile', () =>
    assert.deepStrictEqual(
      resolve('${relativeFile}'),
      path.relative(TEST_WORKSPACE_PATH, testFilePath),
    ))

  test('relativeFileDirname', () =>
    assert.deepStrictEqual(
      resolve('${relativeFileDirname}'),
      path.dirname(path.relative(TEST_WORKSPACE_PATH, testFilePath)),
    ))

  test('fileBasename', () =>
    assert.deepStrictEqual(
      resolve('${fileBasename}'),
      path.basename(testFilePath),
    ))

  test('fileBasenameNoExtension', () =>
    assert.deepStrictEqual(
      resolve('${fileBasenameNoExtension}'),
      path.parse(testFilePath).name,
    ))

  test('fileDirname', () =>
    assert.deepStrictEqual(
      resolve('${fileDirname}'),
      path.dirname(testFilePath),
    ))

  test('fileExtname', () =>
    assert.deepStrictEqual(
      resolve('${fileExtname}'),
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

      assert.deepStrictEqual(resolve('${lineNumber}'), `${expectedLineNumber}`)
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

      assert.deepStrictEqual(resolve('${selectedText}'), `second line`)
    })
  })

  test('execPath', () =>
    assert.deepStrictEqual(resolve('${execPath}'), env.appRoot))

  test('pathSeparator', () =>
    assert.deepStrictEqual(resolve('${pathSeparator}'), path.sep))

  test('resource', () =>
    assert.deepStrictEqual(resolve('${resource}'), document.uri.fsPath))

  test('resourceWorkspaceFolder', () =>
    assert.deepStrictEqual(
      resolve('${resourceWorkspaceFolder}'),
      TEST_WORKSPACE_PATH,
    ))

  test('relativeResource', () =>
    assert.deepStrictEqual(
      resolve('${relativeResource}'),
      path.relative(TEST_WORKSPACE_PATH, document.uri.fsPath),
    ))

  test('relativeResourceDirname', () =>
    assert.deepStrictEqual(
      resolve('${relativeResourceDirname}'),
      path.dirname(path.relative(TEST_WORKSPACE_PATH, document.uri.fsPath)),
    ))

  test('resourceBasename', () =>
    assert.deepStrictEqual(
      resolve('${resourceBasename}'),
      path.basename(document.uri.fsPath),
    ))

  test('resourceBasenameNoExtension', () =>
    assert.deepStrictEqual(
      resolve('${resourceBasenameNoExtension}'),
      path.parse(document.uri.fsPath).name,
    ))

  test('resourceDirname', () =>
    assert.deepStrictEqual(
      resolve('${resourceDirname}'),
      path.dirname(document.uri.fsPath),
    ))

  test('resourceExtname', () =>
    assert.deepStrictEqual(
      resolve('${resourceExtname}'),
      path.parse(document.uri.fsPath).ext,
    ))

  test('env:HOME', () =>
    assert.deepStrictEqual(resolve('${env:HOME}'), process.env['HOME']))
})
