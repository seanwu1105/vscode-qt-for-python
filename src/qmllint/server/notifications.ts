import type { Connection } from 'vscode-languageserver'
import { NotificationType } from 'vscode-languageserver'
import type { ErrorResult } from '../../result-types'
import type { ExecError, StdErrError } from '../../run'

export type QmlLintNotification =
  | ErrorResult<'Parse'>
  | ErrorResult<'Type'>
  | ErrorResult<'NotFound'>
  | ExecError
  | StdErrError

export async function sendQmlLintNotification(
  notification: QmlLintNotification,
  connection: Connection,
) {
  return connection.sendNotification(QmlLintNotificationType, notification)
}

export const QmlLintNotificationType =
  new NotificationType<QmlLintNotification>('QmlLintNotification')
