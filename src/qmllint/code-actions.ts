import type {
  CancellationToken,
  CodeActionContext,
  CodeActionProvider,
  Command,
  ProviderResult,
  Range,
  Selection,
  TextDocument,
} from 'vscode'
import { CodeAction, CodeActionKind, Uri, WorkspaceEdit } from 'vscode'
import { notNil } from '../utils'
import {
  DIAGNOSTIC_SOURCE,
  isDiagnosticWithSuggestions,
  toRange,
} from './converters'

export const QmlLintSuggestionCodeActionKind = CodeActionKind.QuickFix

export function createQmlLintSuggestionsProvider(): CodeActionProvider {
  return {
    provideCodeActions(
      document: TextDocument,
      _range: Range | Selection,
      context: CodeActionContext,
      _token: CancellationToken,
    ): ProviderResult<(Command | CodeAction)[]> {
      const codeActions: CodeAction[] = []

      for (const diagnostic of context.diagnostics) {
        if (diagnostic.source !== DIAGNOSTIC_SOURCE) continue

        if (!isDiagnosticWithSuggestions(diagnostic)) continue

        codeActions.push(
          ...diagnostic.suggestions.map(suggestion => {
            const action = new CodeAction(
              suggestion.message,
              QmlLintSuggestionCodeActionKind,
            )
            action.diagnostics = [diagnostic]

            const edit = new WorkspaceEdit()
            edit.replace(
              notNil(suggestion.filename)
                ? Uri.parse(suggestion.filename)
                : document.uri,
              toRange(suggestion),
              suggestion.replacement,
            )
            action.edit = edit
            return action
          }),
        )
      }

      return codeActions
    },
  }
}
