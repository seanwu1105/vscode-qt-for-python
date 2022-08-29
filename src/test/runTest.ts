import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests,
} from '@vscode/test-electron'
import * as assert from 'node:assert'
import * as cp from 'node:child_process'
import * as path from 'node:path'

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    // Passed to `--extensionDevelopmentPath`
    const extensionDevelopmentPath = path.resolve(__dirname, '../../')

    // The path to test runner
    // Passed to --extensionTestsPath
    const extensionTestsPath = path.resolve(__dirname, './suite/index')

    const vscodeExecutablePath = await downloadAndUnzipVSCode()

    const [cli, ...args] =
      resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath)

    assert.ok(cli !== undefined)

    const command = [cli, ...args, '--install-extension', 'ms-python.python']

    cp.execSync(command.map(s => (s.includes(' ') ? `"${s}"` : s)).join(' '))

    // Download VS Code, unzip it and run the integration test
    await runTests({
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath,
      launchArgs: [path.resolve(__dirname, '../../python')],
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to run tests')
    process.exit(1)
  }
}

main()
