import * as assert from 'node:assert'
import { requestQmlLintCommand } from '../../../../qmllint/server/requests'
import { notNil } from '../../../../utils'

suite('qmllint/requests', () => {
  suite('QmlScriptCommandRequest', () => {
    test('should be defined', () => {
      assert.ok(notNil(requestQmlLintCommand))
    })
  })

  // TODO: Add configuration request test
})
