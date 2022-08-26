import type { Diagnostic } from 'vscode-languageserver/node'
import { DiagnosticSeverity } from 'vscode-languageserver/node'
import { URI } from 'vscode-uri'
import type { ErrorResult, SuccessResult } from '../../types'
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

export function uriToPath(uri: string): UriToPathResult {
  try {
    return { kind: 'Success', value: URI.parse(uri).fsPath }
  } catch (e) {
    return { kind: 'TypeError', message: `Unsupported URI: ${uri}` }
  }
}

export type UriToPathResult = SuccessResult<string> | ErrorResult<'Type'>

export function pathToUri(path: string): PathToUriResult {
  try {
    return { kind: 'Success', value: URI.file(path).toString() }
  } catch (e) {
    return { kind: 'TypeError', message: `Unsupported path: ${path}` }
  }
}

export type PathToUriResult = SuccessResult<string> | ErrorResult<'Type'>
