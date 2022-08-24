import type { Connection } from 'vscode-languageserver/node'
import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import type { DocumentUri } from 'vscode-languageserver-textdocument'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { pathToUri, toDiagnostic, uriToPath } from './converters'
import { lint } from './lint'
import { sendQmlLintNotification } from './notifications'
import { sendQmlLintCommandRequest } from './requests'

export function startServer() {
  const connection = createConnection(ProposedFeatures.all)

  const documents = new TextDocuments(TextDocument)

  connection.onInitialize(() => {
    return { capabilities: { textDocumentSync: TextDocumentSyncKind.Full } }
  })

  documents.onDidOpen(({ document: { uri } }) =>
    onResourceChanged({ uri, connection }),
  )

  documents.onDidSave(({ document: { uri } }) =>
    onResourceChanged({ uri, connection }),
  )

  documents.listen(connection)

  connection.listen()
}

async function onResourceChanged({ uri, connection }: OnResourceChangedArgs) {
  const uriToPathResult = uriToPath(uri)

  if (uriToPathResult.kind === 'TypeError')
    return sendQmlLintNotification(uriToPathResult, connection)

  const qmlLintCommandResult = await sendQmlLintCommandRequest({
    resource: uri,
    connection,
  })

  if (qmlLintCommandResult.kind === 'NotFoundError')
    return sendQmlLintNotification(qmlLintCommandResult, connection)

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
          return sendQmlLintNotification(pathToUriResult, connection)
        case 'Success':
          return connection.sendDiagnostics({
            uri: pathToUriResult.value,
            diagnostics: file.warnings.map(toDiagnostic),
          })
      }
    })

    return Promise.all(promises)
  }

  sendQmlLintNotification(lintResult, connection)
}

type OnResourceChangedArgs = {
  readonly uri: DocumentUri
  readonly connection: Connection
}
