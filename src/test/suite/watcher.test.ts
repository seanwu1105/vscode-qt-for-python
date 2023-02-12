import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Subscription } from 'rxjs'
import { workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { getWatcher$ } from '../../watcher'
import { forceDeleteFile, TEST_ASSETS_PATH, waitFor } from './test-utils'

suite('watcher', () => {
  suite('getWatcher$', () => {
    const test_folder = path.resolve(TEST_ASSETS_PATH, 'watcher-test')
    const watcher$ = getWatcher$(`${test_folder}/**/*.txt`)

    let subscription: Subscription
    let results: URI[]

    suite('when file is created', () => {
      const filename = path.resolve(test_folder, 'create.txt')
      const content = 'test'

      setup(async () => {
        results = []
        await forceDeleteFile(filename)

        subscription = watcher$.subscribe(v => results.push(v))
        await workspace.fs.writeFile(URI.file(filename), Buffer.from(content))
      })

      teardown(async () => {
        subscription.unsubscribe()
        await forceDeleteFile(filename)
      })

      test('emits a value', async () =>
        waitFor(async () => {
          assert.ok(results[0])
          const readResult = await workspace.fs.readFile(results[0])
          assert.strictEqual(readResult.toString(), content)
        }))
    })

    suite('when file is changed', () => {
      const filename = path.resolve(test_folder, 'change.txt')
      const newContent = getRandomString()

      let originalContent: string

      setup(async () => {
        originalContent = (
          await workspace.fs.readFile(URI.file(filename))
        ).toString()
        results = []
        subscription = watcher$.subscribe(v => results.push(v))
        await workspace.fs.writeFile(
          URI.file(filename),
          Buffer.from(newContent),
        )
      })

      teardown(async () => {
        subscription.unsubscribe()
        await workspace.fs.writeFile(
          URI.file(filename),
          Buffer.from(originalContent),
        )
      })

      test('emits a value', async () =>
        waitFor(async () => {
          assert.ok(results[0])
          const readResult = await workspace.fs.readFile(results[0])
          assert.strictEqual(readResult.toString(), newContent)
        }))
    })
  })
})

function getRandomString() {
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return Math.random().toString(36).slice(2)
}
