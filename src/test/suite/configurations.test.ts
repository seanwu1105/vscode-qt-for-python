import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import * as sinon from 'sinon'
import { workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { getOptionsFromConfig, getPathFromConfig } from '../../configurations'
import { MOCK_CONFIGURATION } from '../mocks/extension'

suite('configurations', () => {
  const mockResource = URI.file('fake/resource')
  suite('getPathFromConfig', () => {
    setup(() =>
      sinon.replace(workspace, 'getConfiguration', () => ({
        ...MOCK_CONFIGURATION,
        get: () => path.normalize('${userHome}/.local/bin/qmlls'),
      })),
    )

    teardown(() => sinon.restore())

    test('should return the path from the configuration with predefined variable resolved', () =>
      assert.strictEqual(
        getPathFromConfig({ tool: 'qmlls', resource: mockResource }),
        path.normalize(`${os.homedir()}/.local/bin/qmlls`),
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
        getOptionsFromConfig({ tool: 'qmlls', resource: mockResource }),
        ['--option1', '--option2', `${process.env['HOME']}`],
      ))
  })
})
