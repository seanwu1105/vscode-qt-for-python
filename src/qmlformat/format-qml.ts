import { ReplaySubject, firstValueFrom, using } from 'rxjs'
import { Range, TextEdit, languages } from 'vscode'
import type { URI } from 'vscode-uri'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'
import { getToolCommand$ } from '../tool-utils'
import type { SuccessResult } from '../types'
import { type ErrorResult } from '../types'

export function registerQmlFormatter$({
  extensionUri,
}: {
  readonly extensionUri: URI
}) {
  const formatResult$ = new ReplaySubject<
    SuccessResult<string> | ErrorResult<'NotFound'> | ExecError | StdErrError
  >(1)

  return using(
    () => {
      const disposable = languages.registerDocumentFormattingEditProvider(
        'qml',
        {
          async provideDocumentFormattingEdits(document) {
            const getToolCommandResult = await firstValueFrom(
              getToolCommand$({
                tool: 'qmlformat',
                extensionUri,
                resource: document.uri,
              }),
            )
            if (getToolCommandResult.kind !== 'Success') {
              formatResult$.next(getToolCommandResult)
              return []
            }

            const { command, options } = getToolCommandResult.value
            const runResult = await run({
              command: [...command, ...options, document.uri.fsPath],
            })
            if (runResult.kind !== 'Success') {
              formatResult$.next(runResult)
              return []
            }

            const formatted = runResult.value.stdout
            const fullRange = document.validateRange(
              new Range(
                document.lineAt(0).range.start,
                document.lineAt(document.lineCount - 1).range.end,
              ),
            )
            formatResult$.next({
              kind: 'Success',
              value: `Formatted ${document.uri.fsPath}`,
            })
            return [TextEdit.replace(fullRange, formatted)]
          },
        },
      )
      return { unsubscribe: () => disposable.dispose() }
    },
    () => formatResult$.asObservable(),
  )
}
