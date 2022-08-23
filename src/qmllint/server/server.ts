import type { Connection } from 'vscode-languageserver/node'
import {
  createConnection,
  ProposedFeatures,
  TextDocuments,
  TextDocumentSyncKind,
} from 'vscode-languageserver/node'

import { fileURLToPath, pathToFileURL } from 'node:url'
import { TextDocument } from 'vscode-languageserver-textdocument'
import type { ErrorResult, SuccessResult } from '../../result-types'
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
    const uriToPathResult = uriToPath(uri)

    if (uriToPathResult.kind === 'TypeError')
      return sendQmlLintNotification(uriToPathResult, connection)

    const lintResult = await lint({
      qmlLintCommand: initializationOptions.qmlLintCommand,
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

  documents.listen(connection)

  connection.listen()
}

export type InitializationOptions = { readonly qmlLintCommand: string[] }

export const QmlLintNotification = 'QmlLintNotification'
export type QmlLintNotification =
  | ErrorResult<'Parse'>
  | ExecError
  | StdErrError
  | ErrorResult<'Type'>

function uriToPath(uri: string): UriToPathResult {
  try {
    return { kind: 'Success', value: fileURLToPath(uri) }
  } catch (e) {
    return { kind: 'TypeError', message: `Unsupported URI: ${uri}` }
  }
}

export type UriToPathResult = SuccessResult<string> | ErrorResult<'Type'>

function pathToUri(path: string): PathToUriResult {
  try {
    return { kind: 'Success', value: pathToFileURL(path).href }
  } catch (e) {
    return { kind: 'TypeError', message: `Unsupported path: ${path}` }
  }
}

export type PathToUriResult = SuccessResult<string> | ErrorResult<'Type'>

async function sendQmlLintNotification(
  notification: QmlLintNotification,
  connection: Connection,
) {
  return connection.sendNotification(QmlLintNotification, notification)
}
