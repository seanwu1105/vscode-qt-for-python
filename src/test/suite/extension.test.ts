import * as assert from 'node:assert'
import { activate, deactivate } from '../../extension'
import { notNil } from '../../utils'

suite('extension', () => {
  suite('activate', () => {
    test('should be defined', () => assert.ok(notNil(activate)))
  })
  suite('deactivate', () => {
    test('should be defined', () => assert.ok(notNil(deactivate)))
  })
})
