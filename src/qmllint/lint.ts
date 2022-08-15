import type { ErrorResult, SuccessResult } from '../result-types'
import type { ExecError, StdErrError } from '../run'
import { run } from '../run'

export async function lint({
  qmlLintCommand,
  documentPath,
  options,
}: LintArgs): Promise<LintResult> {
  const runResult = await run({
    command: [...qmlLintCommand, ...options, documentPath],
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

type LintArgs = {
  readonly qmlLintCommand: string[]
  readonly documentPath: string
  readonly options: string[]
}

export type LintResult =
  | SuccessResult<QmlLintResult>
  | ErrorResult<'Parse'>
  | ExecError
  | StdErrError

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

  if (!isQmlLintResult(json))
    return {
      kind: 'ParseError',
      message: `Not a valid QML Lint result: ${value}`,
    }
  return { kind: 'Success', value: json }
}

type ParseQmlLintRunReturnValueResult =
  | SuccessResult<QmlLintResult>
  | ErrorResult<'Parse'>

type QmlLintResult = {
  readonly files: readonly QmlLintFileResult[]
}

type QmlLintFileResult = {
  readonly filename: string
  readonly warnings: readonly QmlLintWarning[]
}

export type QmlLintWarning = {
  readonly column: number
  readonly length: number
  readonly line: number
  readonly message: string
  readonly suggestions: readonly unknown[]
  readonly type: typeof QmlLintWarningType[number]
}

const QmlLintWarningType = ['info', 'warning', 'critical'] as const

function isQmlLintResult(value: any): value is QmlLintResult {
  if (typeof value !== 'object') return false
  if (!Array.isArray(value['files'])) return false
  if (value.files.some((file: any) => !isQmlLintFileResult(file))) return false
  return true
}

function isQmlLintFileResult(value: any): value is QmlLintFileResult {
  if (typeof value !== 'object') return false
  if (typeof value['filename'] !== 'string') return false
  if (!Array.isArray(value['warnings'])) return false
  if (value.warnings.some((warning: any) => !isQmlLintWarning(warning)))
    return false
  return true
}

function isQmlLintWarning(value: any): value is QmlLintWarning {
  if (typeof value !== 'object') return false
  if (typeof value['column'] !== 'number') return false
  if (typeof value['length'] !== 'number') return false
  if (typeof value['line'] !== 'number') return false
  if (typeof value['message'] !== 'string') return false
  if (!Array.isArray(value['suggestions'])) return false
  if (!QmlLintWarningType.includes(value['type'])) return false
  return true
}
