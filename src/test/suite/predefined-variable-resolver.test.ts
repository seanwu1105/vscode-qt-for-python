// TODO: e2e test

import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import * as sinon from 'sinon'
import type { TextEditor, WorkspaceFolder } from 'vscode'
import { env, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { resolvePredefinedVariables } from '../../predefined-variable-resolver'

suite('predefined variable resolver', () => {
  setup(() => {
    sinon.replaceGetter(env, 'appRoot', () => MOCK_APP_ROOT)

    sinon.replaceGetter(
      window,
      'activeTextEditor',
      () =>
        ({
          document: {
            uri: URI.parse(MOCK_FILE_PATH),
            getText: () => MOCK_SELECTED_TEXT,
          },
          selection: { active: { line: MOCK_SELECTED_LINE } },
        } as TextEditor),
    )

    sinon.replace(
      workspace,
      'getWorkspaceFolder',
      () =>
        ({
          uri: URI.parse(MOCK_WORKSPACE_FOLDER_PATH),
        } as WorkspaceFolder),
    )
  })

  teardown(() => sinon.restore())

  test('userHome', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${userHome} ${userHome}'),
      `${os.homedir()} ${os.homedir()}`,
    ))

  test('workspaceFolder', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${workspaceFolder} ${workspaceFolder}'),
      `${MOCK_WORKSPACE_FOLDER_PATH} ${MOCK_WORKSPACE_FOLDER_PATH}`,
    ))

  test('workspaceFolderBasename', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables(
        '${workspaceFolderBasename} ${workspaceFolderBasename}',
      ),
      `your-project your-project`,
    ))

  test('file', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${file} ${file}'),
      `${MOCK_FILE_PATH} ${MOCK_FILE_PATH}`,
    ))

  test('fileWorkspaceFolder', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables(
        '${fileWorkspaceFolder} ${fileWorkspaceFolder}',
      ),
      `${MOCK_WORKSPACE_FOLDER_PATH} ${MOCK_WORKSPACE_FOLDER_PATH}`,
    ))

  test('relativeFile', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${relativeFile} ${relativeFile}'),
      `folder/file.ext folder/file.ext`,
    ))

  test('relativeFileDirname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables(
        '${relativeFileDirname} ${relativeFileDirname}',
      ),
      `folder folder`,
    ))

  test('fileBasename', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileBasename} ${fileBasename}'),
      `file.ext file.ext`,
    ))

  test('fileBasenameNoExtension', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables(
        '${fileBasenameNoExtension} ${fileBasenameNoExtension}',
      ),
      `file file`,
    ))

  test('fileDirname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileDirname} ${fileDirname}'),
      `/home/your-username/your-project/folder /home/your-username/your-project/folder`,
    ))

  test('fileExtname', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${fileExtname} ${fileExtname}'),
      `.ext .ext`,
    ))

  test('lineNumber', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${lineNumber} ${lineNumber}'),
      `${MOCK_SELECTED_LINE + 1} ${MOCK_SELECTED_LINE + 1}`,
    ))

  test('selectedText', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${selectedText} ${selectedText}'),
      `${MOCK_SELECTED_TEXT} ${MOCK_SELECTED_TEXT}`,
    ))

  test('execPath', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${execPath} ${execPath}'),
      `${MOCK_APP_ROOT} ${MOCK_APP_ROOT}`,
    ))

  test('pathSeparator', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${pathSeparator} ${pathSeparator}'),
      `${path.sep} ${path.sep}`,
    ))

  test('env:HOME', () =>
    assert.deepStrictEqual(
      resolvePredefinedVariables('${env:HOME} ${env:HOME}'),
      `${process.env['HOME']} ${process.env['HOME']}`,
    ))
})

const MOCK_APP_ROOT = path.join('mock', 'app', 'root')

const MOCK_FILE_PATH = path.normalize(
  '/home/your-username/your-project/folder/file.ext',
)

const MOCK_SELECTED_LINE = 9

const MOCK_SELECTED_TEXT = 'selected text'

const MOCK_WORKSPACE_FOLDER_PATH = path.normalize(
  '/home/your-username/your-project',
)
