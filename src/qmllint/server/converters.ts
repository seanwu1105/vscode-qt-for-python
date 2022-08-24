import type { Diagnostic } from 'vscode-languageserver/node'
import { DiagnosticSeverity } from 'vscode-languageserver/node'
import { notNil } from '../../utils'
import type { QmlLintWarning } from './lint'

export function toDiagnostic(qmlLintWarning: QmlLintWarning): Diagnostic {
  return {
    range: {
      start: {
        line: notNil(qmlLintWarning.line) ? qmlLintWarning.line - 1 : 0,
        character: notNil(qmlLintWarning.column)
          ? qmlLintWarning.column - 1
          : 0,
      },
      end: {
        line: notNil(qmlLintWarning.line) ? qmlLintWarning.line - 1 : 0,
        character:
          notNil(qmlLintWarning.column) && notNil(qmlLintWarning.length)
            ? qmlLintWarning.column + qmlLintWarning.length - 1
            : 1,
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
