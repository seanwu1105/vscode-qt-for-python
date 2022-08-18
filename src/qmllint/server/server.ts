import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { fileURLToPath, pathToFileURL } from 'node:url'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type { ErrorResult } from '../../result-types'
import type { ExecError, StdErrError } from '../../run'
import { toDiagnostic } from '../converters'
import { lint } from '../lint'

export function startServer() {
  let initializationOptions: InitializationOptions

  const connection = createConnection(ProposedFeatures.all)

  const documents = new TextDocuments(TextDocument)

  connection.onInitialize(params => {
    initializationOptions = params.initializationOptions
    return { capabilities: { textDocumentSync: TextDocumentSyncKind.Full } }
  })

  documents.onDidOpen(({ document: { uri } }) => onDocumentChangedOnDisk(uri))
  documents.onDidSave(({ document: { uri } }) => onDocumentChangedOnDisk(uri))

  async function onDocumentChangedOnDisk(uri: string) {
    const result = await lint({
      qmlLintCommand: initializationOptions.qmlLintCommand,
      documentPath: fileURLToPath(uri),
      options: ['--json'],
    })

    if (result.kind === 'Success')
      return result.value.files.forEach(file =>
        connection.sendDiagnostics({
          uri: pathToFileURL(file.filename).href,
          diagnostics: file.warnings.map(w => toDiagnostic(w)),
        }),
      )

    const notification: QmlLintNotification = result
    return connection.sendNotification(QmlLintNotification, notification)
  }

  documents.listen(connection)

  connection.listen()
}

export type InitializationOptions = { readonly qmlLintCommand: string[] }

export const QmlLintNotification = 'QmlLintNotification'
export type QmlLintNotification = ErrorResult<'Parse'> | ExecError | StdErrError
