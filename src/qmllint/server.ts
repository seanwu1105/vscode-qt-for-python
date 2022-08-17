/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { fileURLToPath, pathToFileURL } from 'node:url'
import { TextDocument } from 'vscode-languageserver-textdocument'
import { toDiagnostic } from './converters'
import { lint } from './lint'

function startServer() {
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

    if (result.kind === 'StdErrError') {
      const n: ErrorNotification = { message: result.stderr }
      return connection.sendNotification(ErrorNotification, n)
    }
    if (result.kind === 'ParseError') {
      const n: ErrorNotification = result
      return connection.sendNotification(ErrorNotification, n)
    }
    if (result.kind === 'ExecError') {
      const n: ErrorNotification = { message: result.error.message }
      return connection.sendNotification(ErrorNotification, n)
    }

    return result.value.files.forEach(file =>
      connection.sendDiagnostics({
        uri: pathToFileURL(file.filename).href,
        diagnostics: file.warnings.map(w => toDiagnostic(w)),
      }),
    )
  }

  documents.listen(connection)

  connection.listen()
}

export type InitializationOptions = { readonly qmlLintCommand: string[] }

export const ErrorNotification = 'ErrorNotification'
export type ErrorNotification = { readonly message: string }

startServer()
