import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode'
import { notNil } from '../utils'
import type { QmlLintSuggestion, QmlLintWarning } from './lint'

export const DIAGNOSTIC_SOURCE = 'qmllint'

export function toDiagnostic(qmlLintWarning: QmlLintWarning): Diagnostic {
  const diagnostic = new DiagnosticWithSuggestions(
    toRange(qmlLintWarning),
    `${qmlLintWarning.message}${
      notNil(qmlLintWarning.id) ? ` (${qmlLintWarning.id})` : ''
    }`,
    qmlLintWarning.type === 'critical'
      ? DiagnosticSeverity.Error
      : qmlLintWarning.type === 'warning'
      ? DiagnosticSeverity.Warning
      : DiagnosticSeverity.Information,
  )

  diagnostic.suggestions = qmlLintWarning.suggestions ?? [] // for code actions

  diagnostic.source = DIAGNOSTIC_SOURCE

  return diagnostic
}

export function toRange(value: LocationalQmlLintValue): Range {
  return new Range(
    new Position(
      notNil(value.line) ? value.line - 1 : 0,
      notNil(value.column) ? value.column - 1 : 0,
    ),
    new Position(
      notNil(value.line) ? value.line - 1 : 0,
      notNil(value.column) && notNil(value.length)
        ? value.column + value.length - 1
        : 1,
    ),
  )
}

type LocationalQmlLintValue = {
  readonly line?: number
  readonly column?: number
  readonly length?: number
}

export class DiagnosticWithSuggestions extends Diagnostic {
  suggestions: QmlLintSuggestion[] = []
}

export function isDiagnosticWithSuggestions(
  diagnostic: Diagnostic,
): diagnostic is DiagnosticWithSuggestions {
  return 'suggestions' in diagnostic
}
