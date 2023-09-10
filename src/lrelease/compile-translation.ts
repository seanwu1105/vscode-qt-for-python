import type { CommandDeps } from '../commands'
import { run } from '../run'
import { getToolCommandWithTargetDocumentUri } from '../tool-utils'

export async function compileTranslations(
  { extensionUri }: CommandDeps,
  ...args: readonly unknown[]
) {
  const result = await getToolCommandWithTargetDocumentUri({
    extensionUri,
    argsToGetTargetDocumentUri: args,
    tool: 'lrelease',
  })
  if (result.kind !== 'Success') return result

  const { command, options, uri } = result.value

  return run({ command: [...command, uri.fsPath, ...options] })
}
