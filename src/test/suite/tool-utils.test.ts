import * as assert from 'node:assert'
import type { Subscription } from 'rxjs'
import { of } from 'rxjs'
import * as sinon from 'sinon'
import type { TextDocument, TextEditor } from 'vscode'
import { window } from 'vscode'
import { URI } from 'vscode-uri'
import * as Configurations from '../../configurations'
import * as Python from '../../python'
import type {
  GetToolCommandResult,
  GetToolCommandWithTargetDocumentUriResult,
} from '../../tool-utils'
import {
  getToolCommand$,
  getToolCommandWithTargetDocumentUri,
} from '../../tool-utils'
import { waitFor } from './test-utils'

suite('tool-utils', () => {
  const mockExtensionUri = URI.file('file:///xyz')

  suite('getToolCommand$', () => {
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
          sinon.replace(Python, 'resolveScriptCommand$', () =>
            of({
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
          sinon.replace(Python, 'resolveScriptCommand$', () =>
            of(mockScriptCommandResult),
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

  suite('getToolCommandWithTargetDocumentUri', () => {
    let result: GetToolCommandWithTargetDocumentUriResult
    const mockPath = '/my/path'
    const mockOptions = ['--option1', '--option2']

    setup(() => {
      sinon.replace(Configurations, 'getPathFromConfig$', () => of(mockPath))
      sinon.replace(Configurations, 'getOptionsFromConfig$', () =>
        of(mockOptions),
      )
    })

    teardown(() => sinon.restore())

    suite('when no arguments are passed', () => {
      const args: readonly unknown[] = []
      suite('when no active document', () => {
        setup(async () => {
          sinon.replaceGetter(window, 'activeTextEditor', () => undefined)

          result = await getToolCommandWithTargetDocumentUri({
            extensionUri: mockExtensionUri,
            argsToGetTargetDocumentUri: args,
            tool: 'designer',
          })
        })

        teardown(() => sinon.restore())

        test('should return TypeError', () =>
          assert.strictEqual(result.kind, 'TypeError'))
      })

      suite('when an active document is open', () => {
        const mockActiveDocumentUri = URI.file('/my/file.qrc')
        setup(async () => {
          sinon.replaceGetter(
            window,
            'activeTextEditor',
            () =>
              ({
                document: { uri: mockActiveDocumentUri } as TextDocument,
              } as TextEditor),
          )

          result = await getToolCommandWithTargetDocumentUri({
            extensionUri: mockExtensionUri,
            argsToGetTargetDocumentUri: args,
            tool: 'designer',
          })
        })

        teardown(() => sinon.restore())

        test('should return Success', () =>
          assert.deepStrictEqual(result, {
            kind: 'Success',
            value: {
              command: [mockPath],
              options: mockOptions,
              uri: mockActiveDocumentUri,
            },
          }))
      })
    })

    suite('when an URI is passed', () => {
      const mockUri = URI.file('/my/file.qrc')

      setup(
        async () =>
          (result = await getToolCommandWithTargetDocumentUri({
            extensionUri: mockExtensionUri,
            argsToGetTargetDocumentUri: [mockUri],
            tool: 'designer',
          })),
      )

      test('should return Success', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: { command: [mockPath], options: mockOptions, uri: mockUri },
        }))
    })

    suite('when an invalid argument is passed', () => {
      const mockInvalidArgument = 42

      setup(
        async () =>
          (result = await getToolCommandWithTargetDocumentUri({
            extensionUri: mockExtensionUri,
            argsToGetTargetDocumentUri: [mockInvalidArgument],
            tool: 'designer',
          })),
      )

      test('should return TypeError', () =>
        assert.strictEqual(result.kind, 'TypeError'))
    })
  })
})
