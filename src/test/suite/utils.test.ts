/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as assert from 'node:assert'
import { isNil, notNil, withConcatMap } from '../../utils'
import { sleep, waitFor } from './test-utils'

suite('utils', () => {
  test('notNil', () => {
    assert.strictEqual(notNil(undefined), false)
    assert.strictEqual(notNil(null), false)
    assert.strictEqual(notNil(0), true)
    assert.strictEqual(notNil(''), true)
    assert.strictEqual(notNil('foo'), true)
    assert.strictEqual(notNil([]), true)
    assert.strictEqual(notNil({}), true)
  })

  test('isNil', () => {
    assert.strictEqual(isNil(undefined), true)
    assert.strictEqual(isNil(null), true)
    assert.strictEqual(isNil(0), false)
    assert.strictEqual(isNil(''), false)
    assert.strictEqual(isNil('foo'), false)
    assert.strictEqual(isNil([]), false)
    assert.strictEqual(isNil({}), false)
  })

  suite('withConcatMap', () => {
    let executedValues: number[]

    const handler = withConcatMap(async (e: number) => {
      await sleep(e)
      executedValues.push(e)
    })

    suite('only one event', () => {
      const events = [10]

      setup(() => (executedValues = []))

      test('should get result value in sequential order', async () => {
        events.forEach(handler)
        await waitFor(() => assert.deepStrictEqual(executedValues, events))
      })
    })

    suite('three events', () => {
      const events = [10, 5, 4]

      setup(() => (executedValues = []))

      test('should get result value in sequential order', async () => {
        events.forEach(handler)
        await waitFor(() => assert.deepStrictEqual(executedValues, events))
      })
    })
  })
})
