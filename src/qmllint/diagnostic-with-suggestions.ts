import { Diagnostic } from 'vscode'
import type { QmlLintSuggestion } from './lint-result'

export class DiagnosticWithSuggestions extends Diagnostic {
  suggestions: QmlLintSuggestion[] = []
}

export function isDiagnosticWithSuggestions(
  diagnostic: Diagnostic,
): diagnostic is DiagnosticWithSuggestions {
  return 'suggestions' in diagnostic
}
