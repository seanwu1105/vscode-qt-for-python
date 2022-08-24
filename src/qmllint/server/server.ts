import type { DocumentUri } from 'vscode-languageserver-textdocument'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type { Connection } from 'vscode-languageserver/node'
import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'
import { pathToUri, toDiagnostic, uriToPath } from './converters'
import { lint } from './lint'
import { sendQmlLintNotification } from './notifications'
import { requestIsEnabled, requestQmlLintCommand } from './requests'

export function startServer() {
  const connection = createConnection(ProposedFeatures.all)

  const documents = new TextDocuments(TextDocument)

  connection.onInitialize(() => ({
    capabilities: { textDocumentSync: TextDocumentSyncKind.Full },
  }))

  documents.onDidOpen(({ document: { uri } }) =>
    withErrorHandler(() => lintQml({ uri, connection }), connection),
  )

  documents.onDidSave(({ document: { uri } }) =>
    withErrorHandler(() => lintQml({ uri, connection }), connection),
  )

  documents.listen(connection)

  connection.listen()
}

async function lintQml({ uri, connection }: LintQmlArgs) {
  const requestIsEnabledResult = await requestIsEnabled({
    resource: uri,
    connection,
  })
  if (requestIsEnabledResult.kind !== 'Success')
    return sendQmlLintNotification({
      notification: requestIsEnabledResult,
      connection,
    })
  if (!requestIsEnabledResult.value)
    return connection.sendDiagnostics({
      uri,
      diagnostics: [],
    })

  const qmlLintCommandResult = await requestQmlLintCommand({
    resource: uri,
    connection,
  })

  const uriToPathResult = uriToPath(uri)

  if (uriToPathResult.kind === 'TypeError')
    return sendQmlLintNotification({
      notification: uriToPathResult,
      connection,
    })

  if (qmlLintCommandResult.kind === 'NotFoundError')
    return sendQmlLintNotification({
      notification: qmlLintCommandResult,
      connection,
    })

  const lintResult = await lint({
    qmlLintCommand: qmlLintCommandResult.value,
    documentPath: uriToPathResult.value,
    options: ['--json'],
  })

  if (lintResult.kind === 'Success') {
    const promises = lintResult.value.files.map(file => {
      const pathToUriResult = pathToUri(file.filename)

      switch (pathToUriResult.kind) {
        case 'TypeError':
          return sendQmlLintNotification({
            notification: pathToUriResult,
            connection,
          })
        case 'Success':
          return connection.sendDiagnostics({
            uri: pathToUriResult.value,
            diagnostics: file.warnings.map(toDiagnostic),
          })
      }
    })

    return Promise.all(promises)
  }

  sendQmlLintNotification({ notification: lintResult, connection })
}

type LintQmlArgs = {
  readonly uri: DocumentUri
  readonly connection: Connection
}

function withErrorHandler<R>(
  f: () => R,
  connection: Connection,
): R | Promise<void> {
  try {
    return f()
  } catch (e) {
    return sendQmlLintNotification({
      notification: {
        kind: 'UnexpectedError',
        message: `Unexpected Error from QML Lint language server: ${JSON.stringify(
          e,
        )}`,
      },
      connection,
    })
  }
}
