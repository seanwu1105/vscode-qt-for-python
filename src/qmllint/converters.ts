import type { Diagnostic } from 'vscode-languageserver/node'
import { DiagnosticSeverity } from 'vscode-languageserver/node'
import type { QmlLintWarning } from './lint'

export function toDiagnostic(qmlLintWarning: QmlLintWarning): Diagnostic {
  return {
    range: {
      start: {
        line: qmlLintWarning.line - 1,
        character: qmlLintWarning.column - 1,
      },
      end: {
        line: qmlLintWarning.line - 1,
        character: qmlLintWarning.column + qmlLintWarning.length - 1,
      },
    },
    message:
      qmlLintWarning.suggestions.length === 0
        ? qmlLintWarning.message
        : `${qmlLintWarning.message} (${JSON.stringify(
            qmlLintWarning.suggestions,
          )})`,
    severity:
      qmlLintWarning.type === 'critical'
        ? DiagnosticSeverity.Error
        : qmlLintWarning.type === 'warning'
        ? DiagnosticSeverity.Warning
        : DiagnosticSeverity.Information,
    source: 'qmllint',
  }
}
