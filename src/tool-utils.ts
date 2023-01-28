import type { URI } from 'vscode-uri'
import { getOptionsFromConfig, getPathFromConfig } from './configurations'
import { resolveScriptCommand } from './python'
import type { CommandArgs } from './run'
import type { ErrorResult, SuccessResult, SupportedTool } from './types'

export async function getToolCommand({
  tool,
  extensionPath,
  resource,
}: GetToolCommandArgs): Promise<GetToolCommandResult> {
  const configToolOptions = getOptionsFromConfig({ tool, resource })

  const configToolPath = getPathFromConfig({ tool, resource })

  if (configToolPath.length !== 0)
    return {
      kind: 'Success',
      value: { command: [configToolPath], options: configToolOptions },
    }

  const resolveScriptCommandResult = await resolveScriptCommand({
    tool,
    extensionPath,
    resource,
  })

  if (resolveScriptCommandResult.kind === 'NotFoundError')
    return resolveScriptCommandResult

  return {
    kind: 'Success',
    value: {
      command: resolveScriptCommandResult.value,
      options: configToolOptions,
    },
  }
}

type GetToolCommandArgs = {
  readonly tool: SupportedTool
  readonly extensionPath: string
  readonly resource: URI | undefined
}

export type GetToolCommandResult =
  | SuccessResult<ToolCommand>
  | ErrorResult<'NotFound'>

export type ToolCommand = {
  readonly command: CommandArgs
  readonly options: CommandArgs
}
