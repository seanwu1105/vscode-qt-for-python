import type { Connection } from 'vscode-languageserver'
import { RequestType } from 'vscode-languageserver'
import type { DocumentUri } from 'vscode-languageserver-textdocument'
import type { ResolveScriptCommandResult } from '../../python'

export async function sendQmlLintCommandRequest({
  resource,
  connection,
}: SendQmlScriptCommandRequestArgs) {
  return connection.sendRequest(QmlScriptCommandRequestType, { resource })
}

type SendQmlScriptCommandRequestArgs = {
  readonly resource: DocumentUri
  readonly connection: Connection
}

export const QmlScriptCommandRequestType = new RequestType<
  QmlScriptCommandRequest,
  QmlScriptCommandResponse,
  unknown
>('QmlScriptCommandRequest')

type QmlScriptCommandRequest = {
  readonly resource: DocumentUri
}

type QmlScriptCommandResponse = ResolveScriptCommandResult
