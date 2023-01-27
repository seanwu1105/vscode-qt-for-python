import type { DiagnosticCollection, ExtensionContext, Uri } from 'vscode'
import { languages, workspace } from 'vscode'
import { EXTENSION_NAMESPACE } from '../constants'
import type { ExecError, StdErrError } from '../run'
import { getToolCommand } from '../tool-utils'
import type { ErrorResult, SuccessResult } from '../types'
import {
  createQmlLintSuggestionsProvider,
  QmlLintSuggestionCodeActionKind,
} from './code-actions'
import { toDiagnostic } from './converters'
import type { QmlLintResult } from './lint'
import { lint } from './lint'

let diagnosticCollection: DiagnosticCollection | undefined = undefined

export function registerQmlLint({
  subscriptions,
  extensionPath,
  onResult,
}: ActivateArgs) {
  diagnosticCollection = languages.createDiagnosticCollection('qmllint')
  subscriptions.push(diagnosticCollection)

  workspace.textDocuments.forEach(async ({ uri, languageId }) =>
    lintQml({ uri, languageId, extensionPath, onResult }),
  )

  subscriptions.push(
    workspace.onDidChangeConfiguration(e => {
      if (e.affectsConfiguration(`${EXTENSION_NAMESPACE}.qmllint`))
        workspace.textDocuments.forEach(async ({ uri, languageId }) =>
          lintQml({ uri, languageId, extensionPath, onResult }),
        )
    }),
  )

  subscriptions.push(
    workspace.onDidOpenTextDocument(async ({ uri, languageId }) =>
      lintQml({ uri, languageId, extensionPath, onResult }),
    ),
  )
  subscriptions.push(
    workspace.onDidSaveTextDocument(async ({ uri, languageId }) =>
      lintQml({ uri, languageId, extensionPath, onResult }),
    ),
  )

  subscriptions.push(
    languages.registerCodeActionsProvider(
      'qml',
      createQmlLintSuggestionsProvider(),
      { providedCodeActionKinds: [QmlLintSuggestionCodeActionKind] },
    ),
  )
}

type ActivateArgs = Pick<
  ExtensionContext,
  'subscriptions' | 'extensionPath'
> & {
  readonly onResult: (result: LintQmlResult) => void
}

function filterTextDocumentEvent(uri: Uri) {
  if (uri.fsPath.endsWith('.git')) return false
  if (uri.scheme === 'output') return false // Example "output:extension-output-..."
  if (uri.scheme === 'vscode') return false // Example "vscode:scm/git/scm0/input?rootUri..."
  return true
}

async function lintQml({
  uri,
  languageId,
  extensionPath,
  onResult,
}: LintQmlArgs): Promise<void> {
  if (languageId !== 'qml') return
  if (!filterTextDocumentEvent(uri)) return

  const enabled =
    workspace
      .getConfiguration(`${EXTENSION_NAMESPACE}.qmllint`, uri)
      .get<boolean>('enabled') ?? true

  if (!enabled) return diagnosticCollection?.clear()

  if (uri.scheme !== 'file')
    return onResult({
      kind: 'TypeError',
      message: `Unsupported file scheme: ${uri.scheme} (${uri.toString()})`,
    })

  const qmlLintCommandResult = await getToolCommand({
    tool: 'qmllint',
    extensionPath,
    resource: uri,
  })

  if (qmlLintCommandResult.kind === 'NotFoundError')
    return onResult(qmlLintCommandResult)

  const lintResult = await lint({
    qmlLintCommand: qmlLintCommandResult.value.command,
    documentPath: uri.fsPath,
    options: qmlLintCommandResult.value.options,
  })

  if (lintResult.kind === 'Success') {
    diagnosticCollection?.set(
      uri,
      lintResult.value.files
        .map(file => file.warnings.map(toDiagnostic))
        .flat(),
    )
  }

  return onResult(lintResult)
}

type LintQmlArgs = {
  readonly uri: Uri
  readonly languageId: string
  readonly extensionPath: string
  readonly onResult: (result: LintQmlResult) => void
}

type LintQmlResult =
  | SuccessResult<QmlLintResult>
  | SuccessResult<string>
  | ErrorResult<'Parse'>
  | ErrorResult<'Type'>
  | ErrorResult<'NotFound'>
  | ExecError
  | StdErrError
