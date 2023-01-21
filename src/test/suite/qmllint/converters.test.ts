/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as assert from 'node:assert'
import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode'
import { toDiagnostic } from '../../../qmllint/converters'
import type { QmlLintWarning } from '../../../qmllint/lint'
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
        const expectedDiagnostic = new Diagnostic(
          new Range(new Position(0, 1), new Position(0, 4)),
          qmlLintWarning.message,
          DiagnosticSeverity.Error,
        )
        expectedDiagnostic.source = 'qmllint'
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
        const expectedDiagnostic = new Diagnostic(
          new Range(new Position(0, 1), new Position(0, 4)),
          qmlLintWarning.message,
          DiagnosticSeverity.Warning,
        )
        expectedDiagnostic.source = 'qmllint'
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
        const expectedDiagnostic = new Diagnostic(
          new Range(new Position(0, 1), new Position(0, 4)),
          qmlLintWarning.message,
          DiagnosticSeverity.Information,
        )
        expectedDiagnostic.source = 'qmllint'
        assert.deepStrictEqual(toDiagnostic(qmlLintWarning), expectedDiagnostic)
      })
    })
  })
})
