import * as assert from 'node:assert'
import * as path from 'node:path'
import * as process from 'node:process'
import type { RunResult } from '../../run'
import { run, wrapAndJoinCommandArgsWithQuotes } from '../../run'
import { TEST_ASSETS_PATH } from './test-utils'

suite('run', () => {
  let result: RunResult

  suite('when execute non-exist program', () => {
    setup(async () => (result = await run({ command: ['non-exist'] })))

    test('should return ExecError', async () =>
      assert.strictEqual(result.kind, 'ExecError'))
  })

  suite(
    'when execute cat command to read exist file with spaces in filename',
    () => {
      setup(async () => {
        const filePath = path.resolve(
          TEST_ASSETS_PATH,
          'filename with spaces.txt',
        )

        if (process.platform === 'win32')
          result = await run({ command: ['type', filePath] })
        else result = await run({ command: ['cat', filePath] })
      })

      test('should return Success with contents', async () => {
        const expected: RunResult = { kind: 'Success', value: 'hello' }
        assert.deepStrictEqual(result, expected)
      })
    },
  )
})

suite('wrapAndJoinCommandArgsWithQuotes', () => {
  test('should wrap and join command args with quotes', async () => {
    const args = ['a', 'b c', 'd']
    const expected = 'a "b c" d'
    assert.strictEqual(wrapAndJoinCommandArgsWithQuotes(args), expected)
  })
})
