/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as assert from 'node:assert'
import { DiagnosticSeverity, Position, Range } from 'vscode'
import { toDiagnostic, toRange } from '../../../qmllint/converters'
import { DiagnosticWithSuggestions } from '../../../qmllint/diagnostic-with-suggestions'
import type { QmlLintWarning } from '../../../qmllint/lint-result'
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
        const expectedDiagnostic = new DiagnosticWithSuggestions(
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
        const expectedDiagnostic = new DiagnosticWithSuggestions(
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
        const expectedDiagnostic = new DiagnosticWithSuggestions(
          new Range(new Position(0, 1), new Position(0, 4)),
          qmlLintWarning.message,
          DiagnosticSeverity.Information,
        )
        expectedDiagnostic.source = 'qmllint'
        assert.deepStrictEqual(toDiagnostic(qmlLintWarning), expectedDiagnostic)
      })
    })
  })

  suite('toRange', () => {
    suite('when line and column are defined', () => {
      const qmlLintWarning = {
        line: 1,
        column: 2,
        length: 3,
      }

      test('should return range with correct start and end positions', () => {
        assert.deepStrictEqual(
          toRange(qmlLintWarning),
          new Range(new Position(0, 1), new Position(0, 4)),
        )
      })
    })

    suite('when line is not defined', () => {
      const qmlLintWarning = {
        line: undefined,
        column: 2,
        length: 3,
      }

      test('should return range with line 0', () => {
        assert.deepStrictEqual(
          toRange(qmlLintWarning),
          new Range(new Position(0, 1), new Position(0, 4)),
        )
      })
    })

    suite('when column is not defined', () => {
      const qmlLintWarning = {
        line: 1,
        column: undefined,
        length: 3,
      }

      test('should return range with column 1', () => {
        assert.deepStrictEqual(
          toRange(qmlLintWarning),
          new Range(new Position(0, 0), new Position(0, 1)),
        )
      })
    })

    suite('when length is not defined', () => {
      const qmlLintWarning = {
        line: 1,
        column: 2,
        length: undefined,
      }

      test('should return range with column 1', () => {
        assert.deepStrictEqual(
          toRange(qmlLintWarning),
          new Range(new Position(0, 1), new Position(0, 1)),
        )
      })
    })
  })
})
