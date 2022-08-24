import type { Connection } from 'vscode-languageserver'
import { ConfigurationRequest, RequestType } from 'vscode-languageserver'
import type { DocumentUri } from 'vscode-languageserver-textdocument'
import { CONFIGURATION_NAMESPACE } from '../../constants'
import type { ResolveScriptCommandResult } from '../../python'
import type { ErrorResult, SuccessResult } from '../../result-types'

export async function requestQmlLintCommand({
  resource,
  connection,
}: RequestArgs) {
  return connection.sendRequest(QmlScriptCommandRequestType, { resource })
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

export async function requestIsEnabled({
  resource,
  connection,
}: RequestArgs): Promise<RequestIsEnabledResult> {
  const configSection = `${CONFIGURATION_NAMESPACE}.qmllint.enabled`
  const response = await connection.sendRequest(ConfigurationRequest.type, {
    items: [{ scopeUri: resource, section: configSection }],
  })
  if (response.length === 0)
    return {
      kind: 'NotFoundError',
      message: `Cannot find configuration: ${configSection}`,
    }
  if (typeof response[0] !== 'boolean')
    return {
      kind: 'TypeError',
      message: `Configuration ${configSection} is not a boolean.`,
    }
  return { kind: 'Success', value: response[0] }
}

type RequestArgs = {
  readonly resource: DocumentUri
  readonly connection: Connection
}

type RequestIsEnabledResult =
  | SuccessResult<boolean>
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
