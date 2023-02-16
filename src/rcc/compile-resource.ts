import { firstValueFrom } from 'rxjs'
import type { CommandDeps } from '../commands'
import { getTargetDocumentUri } from '../commands'
import { run } from '../run'
import { getToolCommand$ } from '../tool-utils'

export async function compileResource(
  { extensionUri }: CommandDeps,
  ...args: any[]
) {
  const targetDocumentUriResult = getTargetDocumentUri(...args)

  if (targetDocumentUriResult.kind !== 'Success') return targetDocumentUriResult

  const qrcFile = targetDocumentUriResult.value

  const getToolCommandResult = await firstValueFrom(
    getToolCommand$({
      tool: 'rcc',
      extensionUri,
      resource: qrcFile,
    }),
  )

  if (getToolCommandResult.kind !== 'Success') return getToolCommandResult

  return run({
    command: [
      ...getToolCommandResult.value.command,
      ...getToolCommandResult.value.options,
      qrcFile.fsPath,
    ],
  })
}
