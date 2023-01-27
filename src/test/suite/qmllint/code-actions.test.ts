import * as assert from 'node:assert'
import type {
  CancellationToken,
  CodeActionContext,
  CodeActionProvider,
  TextDocument,
} from 'vscode'
import { CodeActionTriggerKind, Diagnostic, Range } from 'vscode'
import { URI } from 'vscode-uri'
import { createQmlLintSuggestionsProvider } from '../../../qmllint/code-actions'
import { DIAGNOSTIC_SOURCE } from '../../../qmllint/converters'
import { DiagnosticWithSuggestions } from '../../../qmllint/diagnostic-with-suggestions'

suite('qmllint/code-actions', () => {
  suite('createQmlLintSuggestionsProvider', () => {
    suite('when created', () => {
      let provider: CodeActionProvider
      setup(() => (provider = createQmlLintSuggestionsProvider()))

      test('should return a provider', () => assert.ok(provider))

      suite('when providing code actions with the provider', () => {
        const mockDocument: TextDocument = {
          uri: URI.file('myDocumentPath'),
        } as TextDocument

        const mockRange = new Range(0, 0, 0, 0)

        const mockCancellationToken: CancellationToken = {} as CancellationToken

        suite('when no diagnostic is found', () => {
          const context: CodeActionContext = {
            diagnostics: [],
            triggerKind: CodeActionTriggerKind.Automatic,
            only: undefined,
          }

          test('should return an empty array', () =>
            assert.deepStrictEqual(
              provider.provideCodeActions(
                mockDocument,
                mockRange,
                context,
                mockCancellationToken,
              ),
              [],
            ))
        })

        suite('when some diagnostics with suggestions are from qmllint', () => {
          const diagnostic = new Diagnostic(mockRange, 'myDiagnostic')

          const diagnosticFromQmlLint = new Diagnostic(
            mockRange,
            'myDiagnosticFromQmlLint',
          )
          diagnosticFromQmlLint.source = 'qmllint'

          const diagnosticWithSuggestions = new DiagnosticWithSuggestions(
            mockRange,
            'myDiagnosticWithSuggestions',
          )

          const diagnosticWithSuggestionsFromQmlLint =
            new DiagnosticWithSuggestions(
              mockRange,
              'myDiagnosticWithSuggestionsFromQmlLint',
            )
          diagnosticWithSuggestionsFromQmlLint.source = DIAGNOSTIC_SOURCE
          diagnosticWithSuggestionsFromQmlLint.suggestions = [
            {
              message: 'mySuggestion',
              replacement: 'myReplacement',
              line: 1,
              column: 1,
              length: 1,
              charOffset: 1,
              isHint: true,
            },
          ]

          const context: CodeActionContext = {
            diagnostics: [
              diagnostic,
              diagnosticFromQmlLint,
              diagnosticWithSuggestions,
              diagnosticWithSuggestionsFromQmlLint,
            ],
            triggerKind: CodeActionTriggerKind.Automatic,
            only: undefined,
          }

          test('should return the actions from suggestions', () => {
            const actions = provider.provideCodeActions(
              mockDocument,
              mockRange,
              context,
              mockCancellationToken,
            )
            assert.ok(Array.isArray(actions))
            assert.strictEqual(actions.length, 1)
            assert.strictEqual(
              actions[0]?.title,
              diagnosticWithSuggestionsFromQmlLint.suggestions[0]?.message,
            )
          })
        })
      })
    })
  })
})
