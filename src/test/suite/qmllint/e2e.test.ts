import * as path from 'node:path'
import { commands, extensions, window, workspace } from 'vscode'
import { URI } from 'vscode-uri'

const E2E_TIMEOUT = 1000000

suite('qmllint/e2e/diagnostics', () => {
  suiteSetup(async function () {
    this.timeout(E2E_TIMEOUT)

    removeAllWorkspaceFolders()

    await sleep()

    await commands.executeCommand(
      'workbench.extensions.installExtension',
      'ms-python.python',
    )

    workspace.updateWorkspaceFolders(0, 0, {
      uri: URI.file(path.resolve(__dirname, '..', '..', '..', '..', 'python')),
    })

    await sleep()
  })

  suiteTeardown(async function () {
    this.timeout(E2E_TIMEOUT)

    removeAllWorkspaceFolders()

    await commands.executeCommand(
      'workbench.extensions.uninstallExtension',
      'ms-python.python',
    )

    await sleep()
  })

  test('todo', async () => {
    try {
      await extensions.getExtension('seanwu.vscode-qt-for-python')?.activate()
      const document = await workspace.openTextDocument(
        URI.file(
          path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            'python',
            'tests',
            'assets',
            'missing_import.qml',
          ),
        ),
      )
      await window.showTextDocument(document)
      await sleep()
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
    }
  }).timeout(E2E_TIMEOUT)
}).timeout(E2E_TIMEOUT)

async function sleep(ms = 2000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function removeAllWorkspaceFolders() {
  return workspace.updateWorkspaceFolders(
    0,
    workspace.workspaceFolders ? workspace.workspaceFolders.length : 0,
  )
}
