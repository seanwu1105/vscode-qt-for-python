import * as assert from 'node:assert'
import * as sinon from 'sinon'
import { ConfigurationRequest } from 'vscode-languageserver'
import {
  QmlLintCommandRequestType,
  requestIsEnabled,
  requestQmlLintCommand,
} from '../../../../qmllint/server/requests'

suite('qmllint/requests', () => {
  suite('requestQmlLintCommand', () => {
    const mockSendRequest = sinon.fake()
    const resource = 'file:///foo.qml'

    setup(() =>
      requestQmlLintCommand({ resource, sendRequest: mockSendRequest }),
    )

    test('should send request with correct type', () =>
      sinon.assert.calledWith(mockSendRequest, QmlLintCommandRequestType))
  })

  suite('requestIsEnabled', () => {
    let mockSendRequest: sinon.SinonSpy
    const resource = 'file:///foo.qml'

    setup(() => (mockSendRequest = sinon.fake()))

    test('should send request with correct type', () => {
      requestIsEnabled({ resource, sendRequest: mockSendRequest })

      sinon.assert.calledWith(mockSendRequest, ConfigurationRequest.type)
    })

    suite('when response is empty', () => {
      setup(() => (mockSendRequest = sinon.fake.returns([])))

      test('should return NotFoundError', async () => {
        const result = await requestIsEnabled({
          resource,
          sendRequest: mockSendRequest,
        })

        assert.strictEqual(result.kind, 'NotFoundError')
      })
    })

    suite('when response does not contain a boolean', () => {
      setup(() => (mockSendRequest = sinon.fake.returns(['x'])))

      test('should return TypeError', async () => {
        const result = await requestIsEnabled({
          resource,
          sendRequest: mockSendRequest,
        })

        assert.strictEqual(result.kind, 'TypeError')
      })
    })

    suite('when response contains boolean', () => {
      const expectedValue = false

      setup(() => (mockSendRequest = sinon.fake.returns([expectedValue])))

      test('should return NotFoundError', async () => {
        const result = await requestIsEnabled({
          resource,
          sendRequest: mockSendRequest,
        })

        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: expectedValue,
        })
      })
    })
  })
})
