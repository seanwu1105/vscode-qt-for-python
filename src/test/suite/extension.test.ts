import * as assert from 'node:assert'
import { activate } from '../../extension'
import { notNil } from '../../utils'

suite('extension', () => {
  suite('activate', () => {
    test('should be defined', () => assert.ok(notNil(activate)))
  })
})
