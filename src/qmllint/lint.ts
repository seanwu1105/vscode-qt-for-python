import { z } from 'zod'
import type { CommandArgs, ExecError, StdErrError } from '../run'
import { run } from '../run'
import type { ErrorResult, SuccessResult } from '../types'

export async function lint({
  qmlLintCommand,
  documentPath,
  options,
}: LintArgs): Promise<LintResult> {
  const jsonOption = ['--json', '-']

  const optionsWithJson = [
    ...removeDuplicatedJsonOption(options),
    ...jsonOption,
  ]

  const runResult = await run({
    command: [...qmlLintCommand, ...optionsWithJson, documentPath],
  })

  if (runResult.kind === 'Success')
    return parseQmlLintRunReturnValue(runResult.value)

  if (runResult.kind === 'ExecError') {
    const parsedResult = parseQmlLintRunReturnValue(runResult.stdout)
    if (parsedResult.kind === 'Success') return parsedResult
    return runResult
  }

  const parsedResult = parseQmlLintRunReturnValue(runResult.stderr)
  if (parsedResult.kind === 'Success') return parsedResult
  return runResult
}

export type LintArgs = {
  readonly qmlLintCommand: CommandArgs
  readonly documentPath: string
  readonly options: CommandArgs
}

export type LintResult =
  | SuccessResult<QmlLintResult>
  | ErrorResult<'Parse'>
  | ExecError
  | StdErrError

function removeDuplicatedJsonOption(options: CommandArgs) {
  let cleanedOptions = options
  for (let i = 0; i < options.length; i++)
    if (options[i] === '--json' && options[i + 1] === '-')
      cleanedOptions = [...options.slice(0, i), ...options.slice(i + 1)]

  return cleanedOptions.filter(option => option !== '--json')
}

function parseQmlLintRunReturnValue(
  value: string,
): ParseQmlLintRunReturnValueResult {
  let json
  try {
    json = JSON.parse(value)
  } catch (error) {
    if (error instanceof SyntaxError)
      return { kind: 'ParseError', message: error.message }
    return { kind: 'ParseError', message: JSON.stringify(error) }
  }

  const parseQmlLintResult = qmlLintResultSchema.safeParse(json)

  if (!parseQmlLintResult.success)
    return {
      kind: 'ParseError',
      message: `Not a valid QML Lint result. \n${parseQmlLintResult.error.issues
        .map(i => `${i.path}: ${i.message}`)
        .join('\n')}`,
    }
  return { kind: 'Success', value: parseQmlLintResult.data }
}

type ParseQmlLintRunReturnValueResult =
  | SuccessResult<QmlLintResult>
  | ErrorResult<'Parse'>

// Converted from python/tests/assets/qml/schema.json
export const qmlLintSuggestionSchema = z.object({
  message: z.string(),
  line: z.number().int(),
  column: z.number().int(),
  charOffset: z.number().int(),
  length: z.number().int(),
  replacement: z.string(),
  isHint: z.boolean(),
  filename: z.string().optional(),
})

const qmlLintWarningSchema = z.object({
  type: z.enum(['debug', 'warning', 'critical', 'fatal', 'info', 'unknown']),
  id: z.string().optional(),
  line: z.number().int().optional(),
  column: z.number().int().optional(),
  charOffset: z.number().int().optional(),
  length: z.number().int().optional(),
  message: z.string(),
  suggestions: z.array(qmlLintSuggestionSchema).optional(),
})

const qmlLintResultSchema = z.object({
  files: z.array(
    z.object({
      filename: z.string(),
      warnings: z.array(qmlLintWarningSchema),
      success: z.boolean(),
    }),
  ),
  revision: z.number(), // Should not be too strict to be 3 only
})

export type QmlLintResult = z.infer<typeof qmlLintResultSchema>

export type QmlLintWarning = z.infer<typeof qmlLintWarningSchema>

export type QmlLintSuggestion = z.infer<typeof qmlLintSuggestionSchema>
