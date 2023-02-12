import * as assert from 'node:assert'
import * as path from 'node:path'
import { extensions } from 'vscode'
import { notNil } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, publisher } = require('../../../package.json')

const DEFAULT_CI_WAIT_TIME = 120000
const DEFAULT_WAIT_TIME = 5000

const IS_CI = process.env['CI'] === 'true'

export const DEFAULT_TIMEOUT = IS_CI ? DEFAULT_CI_WAIT_TIME : DEFAULT_WAIT_TIME

export const E2E_TIMEOUT = 1000000

export const TEST_WORKSPACE_PATH = path.resolve(__dirname, '../../../python')

export const TEST_ASSETS_PATH = path.resolve(
  TEST_WORKSPACE_PATH,
  'tests/assets',
)

export async function sleep(ms = DEFAULT_TIMEOUT) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// TODO: This might not be necessary
export async function setupE2EEnvironment() {
  await sleep() // wait for extension to load Extension Gallery

  const pythonExtension = extensions.getExtension('ms-python.python')
  assert.ok(notNil(pythonExtension))
  if (!pythonExtension.isActive) await pythonExtension.activate()

  const extension = extensions.getExtension(`${publisher}.${name}`)
  assert.ok(notNil(extension))
  if (!extension.isActive) await extension.activate()
}

type WaitForOptions = {
  readonly timeout?: number
  readonly interval?: number
}

export async function waitFor<T>(
  callback: () => T | Promise<T>,
  options?: WaitForOptions,
): Promise<T> {
  const defaultOptions: Required<WaitForOptions> = {
    timeout: DEFAULT_TIMEOUT,
    interval: 20,
  }

  const start = Date.now()
  while (Date.now() - start < (options?.timeout ?? defaultOptions.timeout)) {
    try {
      return await callback()
    } catch (e) {
      await sleep(options?.interval ?? defaultOptions.interval)
    }
  }
  throw new Error(
    `Timeout during waitFor: ${options?.timeout ?? defaultOptions.timeout}ms`,
  )
}
