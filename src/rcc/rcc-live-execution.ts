import type { X2jOptionsOptional } from 'fast-xml-parser'
import { XMLParser } from 'fast-xml-parser'
import * as path from 'node:path'
import {
  concatMap,
  defer,
  from,
  merge,
  mergeMap,
  of,
  startWith,
  switchMap,
} from 'rxjs'
import { RelativePattern, workspace } from 'vscode'
import { URI } from 'vscode-uri'
import { z } from 'zod'
import {
  getLiveExecutionEnabledFromConfig$,
  getLiveExecutionGlobFromConfig$,
} from '../configurations'
import type { ErrorResult, SuccessResult } from '../types'
import { getWatcher$ } from '../watcher'
import { compileResource } from './compile-resource'

export function registerRccLiveExecution$({
  extensionUri,
}: RegisterRccLiveExecutionArgs) {
  const enabled$ = getLiveExecutionEnabledFromConfig$({
    tool: 'rcc',
    resource: undefined,
  })

  const glob$ = getLiveExecutionGlobFromConfig$({
    tool: 'rcc',
    resource: undefined,
    defaultValue: '**/*.qrc',
  })

  const qrcFiles$ = glob$.pipe(
    concatMap(glob => workspace.findFiles(glob, '**/site-packages/**')),
    concatMap(uris => from(uris)),
  )

  const watcher$ = glob$.pipe(switchMap(glob => getWatcher$(glob)))

  const onQrcFileChange$ = merge(qrcFiles$, watcher$).pipe(
    mergeMap(qrcUri =>
      registerResourcesLiveExecution$({ extensionUri, qrcUri }),
    ),
  )

  return enabled$.pipe(
    switchMap(enabled => {
      if (!enabled)
        return of({
          kind: 'Success',
          value: 'Live execution disabled',
        } as const)

      return onQrcFileChange$
    }),
  )
}

type RegisterRccLiveExecutionArgs = {
  readonly extensionUri: URI
}

function registerResourcesLiveExecution$({
  extensionUri,
  qrcUri,
}: RegisterResourcesLiveExecutionArgs) {
  return defer(async () => getResourceFiles({ qrcUri })).pipe(
    concatMap(result => {
      if (result.kind !== 'Success') return of(result)

      return merge(
        ...result.value.map(uri => getWatcher$(new RelativePattern(uri, '*'))),
      ).pipe(
        startWith(undefined), // Trigger compilation on resource file changes
        concatMap(async () => compileResource({ extensionUri }, qrcUri)),
      )
    }),
  )
}

type RegisterResourcesLiveExecutionArgs = {
  readonly extensionUri: URI
  readonly qrcUri: URI
}

async function getResourceFiles({
  qrcUri,
}: GetResourceFilesArgs): Promise<GetResourceFilesResult> {
  const content = (await workspace.fs.readFile(qrcUri)).toString()

  const parserOptions: X2jOptionsOptional = {
    isArray: (name, _jpath, _isLeafNode, _isAttribute) => name === 'file',
  }

  const xmlParser = new XMLParser(parserOptions)

  let parsed: unknown
  try {
    parsed = xmlParser.parse(content)
  } catch (e) {
    return {
      kind: 'ParseError',
      message: `Invalid qrc file: ${JSON.stringify(e)}`,
    }
  }

  const validationResult = RccSchema.safeParse(parsed)

  if (!validationResult.success)
    return {
      kind: 'ParseError',
      message: `Invalid qrc file: ${JSON.stringify(
        validationResult.error,
      )} (${parsed})`,
    }

  const resourceUris = validationResult.data.RCC.qresource.file.map(filePath =>
    URI.file(path.join(path.dirname(qrcUri.fsPath), filePath)),
  )
  return { kind: 'Success', value: resourceUris }
}

type GetResourceFilesArgs = {
  readonly qrcUri: URI
}

type GetResourceFilesResult =
  | SuccessResult<readonly URI[]>
  | ErrorResult<'Parse'>

const RccSchema = z.object({
  RCC: z.object({
    qresource: z.object({
      file: z.array(z.string()),
    }),
  }),
})
