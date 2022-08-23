import * as assert from 'node:assert'
import { notNil } from '../../utils'

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
})
