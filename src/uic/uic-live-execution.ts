import { concatMap, of, switchMap } from 'rxjs'
import type { URI } from 'vscode-uri'
import {
  getLiveExecutionEnabledFromConfig$,
  getLiveExecutionGlobFromConfig$,
} from '../configurations'
import { getWatcher$ } from '../watcher'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution$({
  extensionUri,
}: GetUicLiveExecutionArgs) {
  const onUiFileUpdated$ = getLiveExecutionGlobFromConfig$({
    tool: 'uic',
    resource: undefined,
    defaultValue: '**/*.ui',
  }).pipe(
    switchMap(global => getWatcher$(global)),
    concatMap(uri => compileUi({ extensionUri }, uri)),
  )

  return getLiveExecutionEnabledFromConfig$({
    tool: 'uic',
    resource: undefined,
  }).pipe(
    switchMap(enabled => {
      if (!enabled)
        return of({
          kind: 'Success',
          value: 'uic live execution disabled',
        } as const)

      return onUiFileUpdated$
    }),
  )
}

type GetUicLiveExecutionArgs = { readonly extensionUri: URI }
