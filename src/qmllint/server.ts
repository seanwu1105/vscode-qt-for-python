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

import { TextDocument } from 'vscode-languageserver-textdocument'
import type { InitializationOptions } from './client'

function startServer() {
  let initializationOptions: InitializationOptions

  const connection = createConnection(ProposedFeatures.all)

  const documents = new TextDocuments(TextDocument)

  connection.onInitialize(params => {
    initializationOptions = params.initializationOptions

    // eslint-disable-next-line no-console
    console.log('extensionPath', initializationOptions.extensionPath)

    return { capabilities: { textDocumentSync: TextDocumentSyncKind.Full } }
  })

  documents.onDidChangeContent(() => {
    // console.log('change', change)
  })

  documents.listen(connection)

  connection.listen()
}

startServer()
