import { concatMap, firstValueFrom } from 'rxjs'
import type { URI } from 'vscode-uri'
import { getConfiguration$ } from '../configurations'
import { EXTENSION_NAMESPACE } from '../constants'
import type { SupportedTool } from '../types'
import { getWatcher$ } from '../watcher'
import { compileUi } from './compile-ui'

export function registerUicLiveExecution$({
  extensionUri,
}: GetUicLiveExecutionArgs) {
  return getWatcher$('**/*.ui').pipe(
    concatMap(uri => onUiFileUpdated({ uri, extensionUri })),
  )
}

type GetUicLiveExecutionArgs = {
  readonly extensionUri: URI
}

async function onUiFileUpdated({ uri, extensionUri }: OnUiFileUpdatedArgs) {
  const tool: SupportedTool = 'uic'
  const enabled = await firstValueFrom(
    getConfiguration$({
      section: `${EXTENSION_NAMESPACE}.${tool}`,
      key: 'liveExecution',
      defaultValue: true,
      resource: uri,
    }),
  )

  if (!enabled)
    return { kind: 'Success', value: 'Live execution disabled' } as const

  return compileUi({ extensionUri }, uri)
}

type OnUiFileUpdatedArgs = {
  readonly extensionUri: URI
  readonly uri: URI
}
