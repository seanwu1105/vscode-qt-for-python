import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import * as sinon from 'sinon'
import { workspace } from 'vscode'
import { getOptionsFromConfig, getPathFromConfig } from '../../configurations'
import { MOCK_CONFIGURATION } from '../mocks/extension'

suite('configurations', () => {
  suite('getPathFromConfig', () => {
    setup(() =>
      sinon.replace(workspace, 'getConfiguration', () => ({
        ...MOCK_CONFIGURATION,
        get: () => path.normalize('${userHome}/.local/bin/qmllint'),
      })),
    )

    teardown(() => sinon.restore())

    test('should return the path from the configuration with predefined variable resolved', () =>
      assert.strictEqual(
        getPathFromConfig({ tool: 'qmllint', resource: 'my-resource-uri' }),
        path.normalize(`${os.homedir()}/.local/bin/qmllint`),
      ))
  })

  suite('getOptionsFromConfig', () => {
    setup(() =>
      sinon.replace(workspace, 'getConfiguration', () => ({
        ...MOCK_CONFIGURATION,
        get: () => ['--option1', '--option2 ${env:HOME}'],
      })),
    )

    teardown(() => sinon.restore())

    test('should return the options from the configuration with predefined variables resolved', () =>
      assert.deepStrictEqual(
        getOptionsFromConfig({ tool: 'qmllint', resource: 'my-resource-uri' }),
        ['--option1', '--option2', `${process.env['HOME']}`],
      ))
  })
})
