import type { Connection } from 'vscode-languageserver'
import { NotificationType } from 'vscode-languageserver'
import type { ExecError, StdErrError } from '../../run'
import type { ErrorResult } from '../../types'

export type QmlLintNotification =
  | ErrorResult<'Parse'>
  | ErrorResult<'Type'>
  | ErrorResult<'NotFound'>
  | ErrorResult<'Unexpected'>
  | ExecError
  | StdErrError

export async function sendQmlLintNotification({
  notification,
  connection,
}: SendQmlLintNotificationArgs) {
  return connection.sendNotification(QmlLintNotificationType, notification)
}

export type SendQmlLintNotificationArgs = {
  readonly notification: QmlLintNotification
  readonly connection: Connection
}

export const QmlLintNotificationType =
  new NotificationType<QmlLintNotification>('QmlLintNotification')
