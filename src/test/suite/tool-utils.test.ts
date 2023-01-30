import * as assert from 'node:assert'
import { of, Subscription } from 'rxjs'
import * as sinon from 'sinon'
import { URI } from 'vscode-uri'
import * as Configurations from '../../configurations'
import * as Python from '../../python'
import { getToolCommand$, GetToolCommandResult } from '../../tool-utils'
import { waitFor } from './test-utils'

suite('tool-utils', () => {
  suite('getToolCommand$', () => {
    const mockExtensionUri = URI.file('file:///xyz')
    const mockResource = URI.file('fake/resource')

    const toolCommand$ = getToolCommand$({
      tool: 'designer',
      extensionUri: mockExtensionUri,
      resource: mockResource,
    })

    const mockOptions = ['--option1', '--option2']

    let results: GetToolCommandResult[]
    let subscription: Subscription

    setup(() => {
      results = []

      sinon.replace(Configurations, 'getOptionsFromConfig$', () =>
        of(mockOptions),
      )
    })

    teardown(() => {
      subscription.unsubscribe()
      sinon.restore()
    })

    suite('when the tool path is set in configuration', () => {
      const mockPath = 'foo/bar'

      setup(async () =>
        sinon.replace(Configurations, 'getPathFromConfig$', () => of(mockPath)),
      )

      teardown(() => sinon.restore())

      test('should return path with options', async () => {
        subscription = toolCommand$.subscribe(v => results.push(v))

        await waitFor(() =>
          assert.deepStrictEqual(results, [
            {
              kind: 'Success',
              value: { command: [mockPath], options: mockOptions },
            },
          ]),
        )
      })
    })

    suite('when the tool path is not set in configuration', () => {
      const mockPath = ''

      setup(() =>
        sinon.replace(Configurations, 'getPathFromConfig$', () => of(mockPath)),
      )

      teardown(() => sinon.restore())

      suite('when the tool can be found in Python environment', () => {
        const mockCommand = ['foo', 'bar']

        setup(() =>
          sinon.replace(Python, 'resolveScriptCommand', () =>
            Promise.resolve({
              kind: 'Success',
              value: mockCommand,
            }),
          ),
        )

        teardown(() => sinon.restore())

        test('should return path with options', async () => {
          subscription = toolCommand$.subscribe(v => results.push(v))

          await waitFor(() =>
            assert.deepStrictEqual(results, [
              {
                kind: 'Success',
                value: { command: mockCommand, options: mockOptions },
              },
            ]),
          )
        })
      })

      suite('when the tool cannot be found in Python environment', () => {
        const mockScriptCommandResult: GetToolCommandResult = {
          kind: 'NotFoundError',
          message: 'failure',
        }

        setup(() =>
          sinon.replace(Python, 'resolveScriptCommand', () =>
            Promise.resolve(mockScriptCommandResult),
          ),
        )

        teardown(() => sinon.restore())

        test('should return path with options', async () => {
          subscription = toolCommand$.subscribe(v => results.push(v))

          await waitFor(() =>
            assert.deepStrictEqual(results, [mockScriptCommandResult]),
          )
        })
      })
    })
  })
})
