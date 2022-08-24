import * as assert from 'node:assert'
import { sendQmlLintNotification } from '../../../../qmllint/server/notifications'
import { notNil } from '../../../../utils'

suite('qmllint/notification', () => {
  suite('QmlLintNotification', () => {
    test('should be defined', () => {
      assert.ok(notNil(sendQmlLintNotification))
    })
  })
})
