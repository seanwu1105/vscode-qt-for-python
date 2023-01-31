import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Subscription } from 'rxjs'
import { workspace } from 'vscode'
import { URI } from 'vscode-uri'
import type { ResolveScriptCommandResult } from '../../python';
import { resolveScriptCommand$ } from '../../python'
import type { SupportedTool } from '../../types'
import { waitFor } from './test-utils'

const PYTHON_TESTS_TIMEOUT = 10000

suite('python', () => {
  suite.only('resolveScriptCommand$', () => {
    const tool: SupportedTool = 'designer'
    const mockExtensionUri = URI.file('file:///xyz')

    let results: ResolveScriptCommandResult[] = []
    let subscription: Subscription

    setup(() => {
      results = []
      subscription = resolveScriptCommand$({
        tool,
        resource: undefined,
        extensionUri: mockExtensionUri,
      }).subscribe(v => results.push(v))
    })

    teardown(() => subscription.unsubscribe())

    test('should get command with the interpreter in .venv', async () =>
      waitFor(
        () => {
          assert.strictEqual(results.length, 1)
          assert.ok(results[0])
          assert.ok(results[0].kind === 'Success')
          assert.ok(results[0].value.some(s => s.includes('.venv')))
        },
        { timeout: PYTHON_TESTS_TIMEOUT },
      )).timeout(PYTHON_TESTS_TIMEOUT)

    // Skip as we cannot change the interpreter programmatically:
    // https://github.com/microsoft/vscode-python/issues/9673
    suite.skip('when user change Python interpreter', () => {
      setup(async () =>
        workspace
          .getConfiguration('python', undefined)
          .update('defaultInterpreterPath', 'python'),
      )

      teardown(async () =>
        workspace
          .getConfiguration('python', undefined)
          .update('defaultInterpreterPath', undefined),
      )

      test('should get command with the new interpreter', async () =>
        waitFor(
          () => {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            assert.strictEqual(results.length, 2)
            assert.ok(results[1])
            assert.ok(results[1].kind === 'Success')
            assert.strictEqual(results[1].value, [
              'python',
              path.join(mockExtensionUri.fsPath, 'script', `${tool}.py`),
            ])
          },
          { timeout: PYTHON_TESTS_TIMEOUT },
        )).timeout(PYTHON_TESTS_TIMEOUT)
    })
  })
})
