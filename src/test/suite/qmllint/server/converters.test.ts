import * as assert from 'node:assert'
import * as path from 'node:path'
import type { Diagnostic } from 'vscode-languageserver/node'
import { DiagnosticSeverity } from 'vscode-languageserver/node'
import { URI } from 'vscode-uri'
import {
  pathToUri,
  toDiagnostic,
  uriToPath,
} from '../../../../qmllint/server/converters'
import type { QmlLintWarning } from '../../../../qmllint/server/lint'
suite('qmllint/converters', () => {
  suite('toDiagnostic', () => {
    suite('when QML Lint warning is critical type', () => {
      const qmlLintWarning: QmlLintWarning = {
        line: 1,
        column: 2,
        length: 3,
        message: 'my message',
        suggestions: [],
        type: 'critical',
      }

      test('should return error diagnostic', () => {
        const expectedDiagnostic: Diagnostic = {
          range: {
            start: { line: 0, character: 1 },
            end: { line: 0, character: 4 },
          },
          message: qmlLintWarning.message,
          severity: DiagnosticSeverity.Error,
          source: 'qmllint',
        }

        assert.deepStrictEqual(toDiagnostic(qmlLintWarning), expectedDiagnostic)
      })
    })

    suite('when QML Lint warning is warning type', () => {
      const qmlLintWarning: QmlLintWarning = {
        line: 1,
        column: 2,
        length: 3,
        message: 'my message',
        suggestions: [],
        type: 'warning',
      }

      test('should return warning diagnostic', () => {
        const expectedDiagnostic: Diagnostic = {
          range: {
            start: { line: 0, character: 1 },
            end: { line: 0, character: 4 },
          },
          message: qmlLintWarning.message,
          severity: DiagnosticSeverity.Warning,
          source: 'qmllint',
        }

        assert.deepStrictEqual(toDiagnostic(qmlLintWarning), expectedDiagnostic)
      })
    })

    suite('when QML Lint warning is info type', () => {
      const qmlLintWarning: QmlLintWarning = {
        line: 1,
        column: 2,
        length: 3,
        message: 'my message',
        suggestions: [],
        type: 'info',
      }

      test('should return information diagnostic', () => {
        const expectedDiagnostic: Diagnostic = {
          range: {
            start: { line: 0, character: 1 },
            end: { line: 0, character: 4 },
          },
          message: qmlLintWarning.message,
          severity: DiagnosticSeverity.Information,
          source: 'qmllint',
        }

        assert.deepStrictEqual(toDiagnostic(qmlLintWarning), expectedDiagnostic)
      })
    })
  })

  suite('uriToPath', () => {
    suite('when URI is valid', () => {
      const uri = URI.parse('file:///path/to/file.qml')

      test('should return path', () => {
        assert.deepStrictEqual(uriToPath(uri.toString()), {
          kind: 'Success',
          value: path.join('/', 'path', 'to', 'file.qml'),
        })
      })
    })
  })

  suite('pathToUri', () => {
    suite('when path is valid', () => {
      const p = path.join('path', 'to', 'file.qml')

      test('should return URI', () => {
        assert.deepStrictEqual(pathToUri(p), {
          kind: 'Success',
          value: 'file:///path/to/file.qml',
        })
      })
    })
  })
})
