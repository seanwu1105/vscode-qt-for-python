import { Diagnostic, DiagnosticSeverity, Position, Range } from 'vscode'
import { notNil } from '../utils'
import type { QmlLintWarning } from './lint'

export function toDiagnostic(qmlLintWarning: QmlLintWarning): Diagnostic {
  const diagnostic = new Diagnostic(
    new Range(
      new Position(
        notNil(qmlLintWarning.line) ? qmlLintWarning.line - 1 : 0,
        notNil(qmlLintWarning.column) ? qmlLintWarning.column - 1 : 0,
      ),
      new Position(
        notNil(qmlLintWarning.line) ? qmlLintWarning.line - 1 : 0,
        notNil(qmlLintWarning.column) && notNil(qmlLintWarning.length)
          ? qmlLintWarning.column + qmlLintWarning.length - 1
          : 1,
      ),
    ),
    qmlLintWarning.suggestions?.length === 0
      ? qmlLintWarning.message
      : `${qmlLintWarning.message} (${JSON.stringify(
          qmlLintWarning.suggestions,
        )})`,
    qmlLintWarning.type === 'critical'
      ? DiagnosticSeverity.Error
      : qmlLintWarning.type === 'warning'
      ? DiagnosticSeverity.Warning
      : DiagnosticSeverity.Information,
  )

  diagnostic.source = 'qmllint'

  return diagnostic
}
