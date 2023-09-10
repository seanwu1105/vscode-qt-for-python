import * as assert from 'node:assert'
import * as os from 'node:os'
import * as path from 'node:path'
import type { Subscription } from 'rxjs'
import * as sinon from 'sinon'
import type { ConfigurationChangeEvent } from 'vscode'
import { workspace } from 'vscode'
import {
  DEFAULT_OPTIONS,
  DEFAULT_PATH,
  getOptionsFromConfig$,
  getPathFromConfig$,
} from '../../configurations'
import { EXTENSION_NAMESPACE } from '../../constants'
import type { CommandArgs } from '../../run'
import type { SupportedTool } from '../../types'
import { waitFor } from './test-utils'

suite('configurations', () => {
  suite('getPathFromConfig$', () => {
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
      const fakeFunc = (listener: (e: ConfigurationChangeEvent) => unknown) => {
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

    test('should get default path', async () =>
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

  suite('getOptionsFromConfig$', () => {
    const tool: SupportedTool = 'designer'
    const options$ = getOptionsFromConfig$({
      tool,
      resource: undefined,
    })
    let stub: sinon.SinonStub
    let disposeSpy: sinon.SinonSpy
    let results: CommandArgs[]
    let subscription: Subscription

    setup(() => {
      const originalFunc = workspace.onDidChangeConfiguration
      const fakeFunc = (listener: (e: ConfigurationChangeEvent) => unknown) => {
        const disposable = originalFunc(listener)
        disposeSpy = sinon.spy(disposable, 'dispose')
        return disposable
      }

      stub = sinon
        .stub(workspace, 'onDidChangeConfiguration')
        .callsFake(fakeFunc)

      results = []
      subscription = options$.subscribe(v => results.push(v))
    })

    teardown(() => {
      subscription.unsubscribe()
      stub.restore()
    })

    test('should get default options', async () =>
      waitFor(() => assert.deepStrictEqual(results, [DEFAULT_OPTIONS])))

    suite('when update options', () => {
      setup(async () =>
        workspace
          .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`)
          .update('options', ['--option1', '--option2 ${env:HOME}']),
      )

      teardown(async () =>
        workspace
          .getConfiguration(`${EXTENSION_NAMESPACE}.${tool}`)
          .update('options', undefined),
      )

      test('should get the updated options from the configuration with predefined variable resolved', async () =>
        waitFor(() =>
          assert.deepStrictEqual(results, [
            DEFAULT_OPTIONS,
            ['--option1', '--option2', `${process.env['HOME']}`],
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
