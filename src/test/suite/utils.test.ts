import * as assert from 'node:assert'
import { isNil, notNil } from '../../utils'

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
})
