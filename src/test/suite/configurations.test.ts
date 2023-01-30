import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import type { Subscription } from 'rxjs'
import * as sinon from 'sinon'
import type { ConfigurationChangeEvent } from 'vscode'
import { workspace } from 'vscode'
import { URI } from 'vscode-uri'
import {
  DEFAULT_PATH,
  getOptionsFromConfig,
  getPathFromConfig,
  getPathFromConfig$,
} from '../../configurations'
import { EXTENSION_NAMESPACE } from '../../constants'
import type { SupportedTool } from '../../types'
import { MOCK_CONFIGURATION } from '../mocks/extension'
import { waitFor } from './test-utils'

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

  suite.only('getPathFromConfig$', () => {
    const tool: SupportedTool = 'designer'
    const path$ = getPathFromConfig$({
      tool,
      resource: undefined,
    })
    let stub: sinon.SinonStub
    let disposeSpy: sinon.SinonSpy
    let results: string[]
    let subscription: Subscription

    setup(() => {
      const originalFunc = workspace.onDidChangeConfiguration
      const fakeFunc = (listener: (e: ConfigurationChangeEvent) => any) => {
        const disposable = originalFunc(listener)
        disposeSpy = sinon.spy(disposable, 'dispose')
        return disposable
      }

      stub = sinon
        .stub(workspace, 'onDidChangeConfiguration')
        .callsFake(fakeFunc)

      results = []
      subscription = path$.subscribe(v => results.push(v))
    })

    teardown(() => {
      subscription.unsubscribe()
      stub.restore()
    })

    test('should default path', async () =>
      waitFor(() => assert.deepStrictEqual(results, [DEFAULT_PATH])))

    suite('when update path', () => {
      setup(async () =>
        workspace
          .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`)
          .update('path', path.normalize('${userHome}/.local/bin/tool')),
      )

      teardown(async () =>
        workspace
          .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`)
          .update('path', undefined),
      )

      test('should get the path from the configuration with predefined variable resolved', async () =>
        waitFor(() =>
          assert.deepStrictEqual(results, [
            DEFAULT_PATH,
            path.normalize(`${os.homedir()}/.local/bin/tool`),
          ]),
        ))
    })

    suite('when unsubscribe', () => {
      setup(() => subscription.unsubscribe())

      test('should dispose all disposables', () =>
        assert.ok(disposeSpy.calledOnce))
    })
  })
})
