import * as assert from 'node:assert'
import * as path from 'node:path'
import * as sinon from 'sinon'
import { extensions, workspace } from 'vscode'
import type {
  PythonExtensionApi,
  ResolveScriptCommandArgs,
  ResolveScriptCommandResult,
} from '../../python'
import { resolveScriptCommand } from '../../python'
import { MOCK_CONFIGURATION, MOCK_EXTENSION } from '../mocks/extension'

suite('python', () => {
  suite('resolveScriptCommand', () => {
    const args: ResolveScriptCommandArgs = {
      scriptName: 'qmllint',
      extensionPath: 'xyz',
    }

    let command: ResolveScriptCommandResult

    suite('when getting Python interpreter path is successful', () => {
      const mockPythonExecCommand = ['python']

      setup(() => {
        const mockPythonExtensionApi: PythonExtensionApi = {
          settings: {
            getExecutionDetails: () => ({ execCommand: mockPythonExecCommand }),
          },
        }

        sinon.replace(extensions, 'getExtension', (extensionId: string) => ({
          ...MOCK_EXTENSION,
          id: extensionId,
          api: mockPythonExtensionApi,
          activate: () => mockPythonExtensionApi as any,
        }))
      })

      teardown(() => sinon.restore())

      suite('when getting path from Python extension execCommand', () => {
        setup(async () => (command = await resolveScriptCommand(args)))

        test('should get success result', async () => {
          const expectedResult: ResolveScriptCommandResult = {
            kind: 'Success',
            value: [
              ...mockPythonExecCommand,
              path.join(
                args.extensionPath,
                'python',
                'scripts',
                `${args.scriptName}.py`,
              ),
            ],
          }

          assert.deepStrictEqual(command, expectedResult)
        })
      })

      suite(
        'when getting path from Python extension defaultInterpreterPath',
        () => {
          const mockDefaultInterpreterPath = 'python'

          setup(async () => {
            sinon.replace(workspace, 'getConfiguration', () => ({
              ...MOCK_CONFIGURATION,
              get: () => mockDefaultInterpreterPath,
            }))
            command = await resolveScriptCommand(args)
          })

          teardown(() => sinon.restore())

          test('should get success result', async () => {
            const expectedResult: ResolveScriptCommandResult = {
              kind: 'Success',
              value: [
                mockDefaultInterpreterPath,
                path.join(
                  args.extensionPath,
                  'python',
                  'scripts',
                  `${args.scriptName}.py`,
                ),
              ],
            }

            assert.deepStrictEqual(command, expectedResult)
          })
        },
      )
    })

    suite('when getting Python interpreter path is failed', async () => {
      setup(async () => {
        const mockPythonExtensionApi: PythonExtensionApi = {
          settings: { getExecutionDetails: () => ({ execCommand: undefined }) },
        }

        sinon.replace(extensions, 'getExtension', (extensionId: string) => ({
          ...MOCK_EXTENSION,
          id: extensionId,
          api: mockPythonExtensionApi,
          activate: () => mockPythonExtensionApi as any,
        }))

        sinon.replace(workspace, 'getConfiguration', () => ({
          ...MOCK_CONFIGURATION,
          get: () => undefined,
        }))

        command = await resolveScriptCommand(args)
      })

      test('should get error result', () =>
        assert.deepStrictEqual(command.kind, 'NotFoundError'))
    })
  })
})
