import * as assert from 'node:assert'
import * as sinon from 'sinon'
import * as Configurations from '../../configurations'
import * as Python from '../../python'
import type { GetToolCommandResult } from '../../tool-utils'
import { getToolCommand } from '../../tool-utils'

suite('tool-utils', () => {
  suite('getToolCommand', () => {
    const mockOptions = ['--option1', '--option2']

    let result: GetToolCommandResult

    setup(() =>
      sinon.replace(Configurations, 'getOptionsFromConfig', () => mockOptions),
    )

    teardown(() => sinon.restore())

    suite('when the tool path is set in configuration', () => {
      const mockPath = 'foo/bar'

      setup(async () => {
        sinon.replace(Configurations, 'getPathFromConfig', () => mockPath)

        result = await getToolCommand({
          tool: 'rcc',
          extensionPath: '',
          resource: '',
        })
      })

      teardown(() => sinon.restore())

      test('should return path with options', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: { command: [mockPath], options: mockOptions },
        }))
    })

    suite('when the tool path is not set in configuration', () => {
      const mockPath = ''

      setup(() =>
        sinon.replace(Configurations, 'getPathFromConfig', () => mockPath),
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
          result = await getToolCommand({
            tool: 'rcc',
            extensionPath: '',
            resource: '',
          })

          assert.deepStrictEqual(result, {
            kind: 'Success',
            value: { command: mockCommand, options: mockOptions },
          })
        })
      })

      suite('when the tool cannot be found in Python environment', () => {
        setup(() =>
          sinon.replace(Python, 'resolveScriptCommand', () =>
            Promise.resolve({ kind: 'NotFoundError', message: 'failure' }),
          ),
        )

        teardown(() => sinon.restore())

        test('should return path with options', async () => {
          result = await getToolCommand({
            tool: 'rcc',
            extensionPath: '',
            resource: '',
          })

          assert.strictEqual(result.kind, 'NotFoundError')
        })
      })
    })
  })
})
