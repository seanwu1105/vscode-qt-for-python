import * as assert from 'node:assert'
import {
  requestIsEnabled,
  requestQmlLintCommand,
} from '../../../../qmllint/server/requests'
import { notNil } from '../../../../utils'

suite('qmllint/requests', () => {
  suite('requestQmlLintCommand', () => {
    test('should be defined', () => assert.ok(notNil(requestQmlLintCommand)))
  })

  suite('requestIsEnabled', () => {
    test('should be defined', () => assert.ok(notNil(requestIsEnabled)))
  })
})
