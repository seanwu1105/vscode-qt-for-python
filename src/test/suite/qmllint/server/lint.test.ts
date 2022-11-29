import * as assert from 'node:assert'
import * as sinon from 'sinon'
import * as GetVersion from '../../../../qmllint/server/get-version'
import type {
  LintArgs,
  LintResult,
  QmlLintResult,
} from '../../../../qmllint/server/lint'
import { lint } from '../../../../qmllint/server/lint'
import * as Run from '../../../../run'

suite('qmllint/lint', () => {
  const args: LintArgs = {
    qmlLintCommand: ['qmllint'],
    documentPath: 'myDocumentPath',
    options: ['--option1', '--option2'],
  }

  const mockParsableQmlLintResult: QmlLintResult = {
    files: [
      {
        filename: 'myFile.qml',
        warnings: [{ message: 'my message', suggestions: [], type: 'warning' }],
      },
    ],
  }

  const mockGetVersionResult: GetVersion.GetVersionResult = {
    kind: 'Success',
    value: '6.4.1',
  }

  let result: LintResult

  setup(() =>
    sinon.replace(GetVersion, 'getVersion', async () => mockGetVersionResult),
  )

  teardown(() => sinon.restore())

  suite('when linting success', () => {
    suite('when lint result is parsable', () => {
      setup(async () => {
        sinon.replace(Run, 'run', async () => ({
          kind: 'Success',
          value: JSON.stringify(mockParsableQmlLintResult),
        }))

        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be successful with parsed result', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: mockParsableQmlLintResult,
        }))
    })
    suite('when lint result is not parsable', () => {
      const mockUnparsableQmlLintResult: Partial<QmlLintResult> = {}

      setup(async () => {
        sinon.replace(Run, 'run', async () => ({
          kind: 'Success',
          value: JSON.stringify(mockUnparsableQmlLintResult),
        }))

        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be ParseError', () =>
        assert.strictEqual(result.kind, 'ParseError'))
    })
  })

  suite('when linting has an execution error', () => {
    suite('when stdout is parsable', () => {
      const runResult: Run.RunResult = {
        kind: 'ExecError',
        error: {},
        stdout: JSON.stringify(mockParsableQmlLintResult),
        stderr: '',
      }

      setup(async () => {
        sinon.replace(Run, 'run', async () => runResult)
        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be successful with parsed result', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: mockParsableQmlLintResult,
        }))
    })

    suite('when stdout is not parsable', () => {
      const runResult: Run.RunResult = {
        kind: 'ExecError',
        error: {},
        stdout: '',
        stderr: '',
      }

      setup(async () => {
        sinon.replace(Run, 'run', async () => runResult)
        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be ExecError', () =>
        assert.deepStrictEqual(result, runResult))
    })
  })

  suite('when linting has stderr', () => {
    suite('when stderr is parsable', () => {
      const runResult: Run.RunResult = {
        kind: 'StdErrError',
        stdout: '',
        stderr: JSON.stringify(mockParsableQmlLintResult),
      }

      setup(async () => {
        sinon.replace(Run, 'run', async () => runResult)
        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be successful with parsed result', () =>
        assert.deepStrictEqual(result, {
          kind: 'Success',
          value: mockParsableQmlLintResult,
        }))
    })
    suite('when stderr is not parsable', () => {
      const runResult: Run.RunResult = {
        kind: 'StdErrError',
        stdout: '',
        stderr: '',
      }

      setup(async () => {
        sinon.replace(Run, 'run', async () => runResult)
        result = await lint(args)
      })

      teardown(() => sinon.restore())

      test('should be StdErrError', () =>
        assert.deepStrictEqual(result, runResult))
    })
  })
})
