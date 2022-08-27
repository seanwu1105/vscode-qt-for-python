import * as assert from 'node:assert'
import * as sinon from 'sinon'
import type { TextDocument, TextEditor } from 'vscode'
import { window } from 'vscode'
import { URI } from 'vscode-uri'
import type { GetTargetDocumentUriResult } from '../../commands'
import { getTargetDocumentUri } from '../../commands'

suite('commands', () => {
  suite('getTargetDocumentUri', () => {
    let result: GetTargetDocumentUriResult
    suite('when no arguments are passed', () => {
      suite('when no active document', () => {
        setup(() => {
          sinon.replaceGetter(window, 'activeTextEditor', () => undefined)

          result = getTargetDocumentUri()
        })

        teardown(() => sinon.restore())

        test('should return TypeError', () =>
          assert.strictEqual(result.kind, 'TypeError'))
      })

      suite('when an active document is open', () => {
        const mockActiveDocumentUri = URI.file('/my/file.qrc')
        setup(() => {
          sinon.replaceGetter(
            window,
            'activeTextEditor',
            () =>
              ({
                document: { uri: mockActiveDocumentUri } as TextDocument,
              } as TextEditor),
          )

          result = getTargetDocumentUri()
        })

        teardown(() => sinon.restore())

        test('should return Success', () =>
          assert.deepStrictEqual(result, {
            kind: 'Success',
            value: mockActiveDocumentUri,
          }))
      })
    })

    suite('when an URI is passed', () => {
      const mockUri = URI.file('/my/file.qrc')

      setup(() => (result = getTargetDocumentUri(mockUri)))

      test('should return Success', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: mockUri,
        }))
    })

    suite('when an invalid argument is passed', () => {
      const mockInvalidArgument = 42

      setup(() => (result = getTargetDocumentUri(mockInvalidArgument)))

      test('should return TypeError', () =>
        assert.strictEqual(result.kind, 'TypeError'))
    })
  })
})
