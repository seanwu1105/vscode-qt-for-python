import { concatMap, firstValueFrom, switchMap } from 'rxjs'
import type { URI } from 'vscode-uri'
import {
  getLiveExecutionEnabledFromConfig$,
  getLiveExecutionGlobFromConfig$,
} from '../configurations'
import type { SupportedTool } from '../types'
import { getWatcher$ } from '../watcher'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution$({
  extensionUri,
}: GetUicLiveExecutionArgs) {
  return getLiveExecutionGlobFromConfig$({
    tool: 'uic',
    resource: undefined,
    defaultValue: '**/*.ui',
  }).pipe(
    switchMap(glob => getWatcher$(glob)),
    concatMap(uri => onUiFileUpdated({ uri, extensionUri })),
  )
}

type GetUicLiveExecutionArgs = { readonly extensionUri: URI }

async function onUiFileUpdated({ uri, extensionUri }: OnUiFileUpdatedArgs) {
  const tool: SupportedTool = 'uic'
  const enabled = await firstValueFrom(
    getLiveExecutionEnabledFromConfig$({ tool, resource: uri }),
  )

  if (!enabled)
    return { kind: 'Success', value: 'Live execution disabled' } as const

  return compileUi({ extensionUri }, uri)
}

type OnUiFileUpdatedArgs = {
  readonly extensionUri: URI
  readonly uri: URI
}
