import * as assert from 'node:assert'
import { Diagnostic, Position, Range } from 'vscode'
import {
  DiagnosticWithSuggestions,
  isDiagnosticWithSuggestions,
} from '../../../qmllint/diagnostic-with-suggestions'

suite('diagnostic-with-suggestions', () => {
  suite('isDiagnosticWithSuggestions', () => {
    test('should return true if diagnostic has suggestions', () => {
      const diagnostic = new DiagnosticWithSuggestions(
        new Range(new Position(0, 0), new Position(0, 0)),
        'test',
      )
      diagnostic.suggestions = []
      assert.strictEqual(isDiagnosticWithSuggestions(diagnostic), true)
    })

    test('should return false if diagnostic does not have suggestions', () => {
      const diagnostic = new Diagnostic(
        new Range(new Position(0, 0), new Position(0, 0)),
        'test',
      )
      assert.strictEqual(isDiagnosticWithSuggestions(diagnostic), false)
    })
  })
})
