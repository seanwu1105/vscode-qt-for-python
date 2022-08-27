import type { Connection } from 'vscode-languageserver'
import { ConfigurationRequest, RequestType } from 'vscode-languageserver'
import type { DocumentUri } from 'vscode-languageserver-textdocument'
import { EXTENSION_NAMESPACE } from '../../constants'
import type { ToolCommand } from '../../tool-utils'
import type { ErrorResult, SuccessResult } from '../../types'
import { isNil } from '../../utils'

export async function requestQmlLintCommand({
  resource,
  sendRequest,
}: RequestArgs) {
  return sendRequest(QmlLintCommandRequestType, { resource })
}

export const QmlLintCommandRequestType = new RequestType<
  QmlLintCommandRequest,
  QmlLintCommandResponse,
  unknown
>('QmlLintCommandRequest')

type QmlLintCommandRequest = {
  readonly resource: DocumentUri
}

export type QmlLintCommandResponse =
  | SuccessResult<ToolCommand>
  | ErrorResult<'NotFound'>

export async function requestIsEnabled({
  resource,
  sendRequest,
}: RequestArgs): Promise<RequestIsEnabledResult> {
  const configSection = `${EXTENSION_NAMESPACE}.qmllint.enabled`
  const response = await sendRequest(ConfigurationRequest.type, {
    items: [{ scopeUri: resource, section: configSection }],
  })
  if (isNil(response) || response.length === 0)
    return {
      kind: 'NotFoundError',
      message: `Cannot find configuration: ${configSection}`,
    }
  if (typeof response[0] !== 'boolean')
    return {
      kind: 'TypeError',
      message: `Configuration ${configSection} is not a boolean: ${response[0]}`,
    }
  return { kind: 'Success', value: response[0] }
}

type RequestArgs = {
  readonly resource: DocumentUri
  readonly sendRequest: Connection['sendRequest']
}

type RequestIsEnabledResult =
  | SuccessResult<boolean>
  | ErrorResult<'NotFound'>
  | ErrorResult<'Type'>
