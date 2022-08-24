import * as assert from 'node:assert'
import { activate, deactivate } from '../../extension'
import { notNil } from '../../utils'

suite('extension', () => {
  suite('activate', () => {
    test('should be defined', () => assert.equal(notNil(activate), true))
  })
  suite('deactivate', () => {
    test('should be defined', () => assert.equal(notNil(deactivate), true))
  })
})
