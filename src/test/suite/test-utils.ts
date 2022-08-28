import * as assert from 'node:assert'
import * as path from 'node:path'
import { extensions } from 'vscode'
import { notNil } from '../../utils'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, publisher } = require('../../../package.json')

export const E2E_TIMEOUT = 1000000

export const TEST_WORKSPACE_PATH = path.resolve(__dirname, '../../../python')

export const TEST_ASSETS_PATH = path.resolve(
  TEST_WORKSPACE_PATH,
  'tests/assets',
)

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DEFAULT_SLEEP_TIME = process.env['CI'] === 'true' ? 60000 : 1000

export async function sleep(ms = DEFAULT_SLEEP_TIME) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function setupE2EEnvironment() {
  await sleep() // wait for extension to load Extension Gallery

  const pythonExtension = extensions.getExtension('ms-python.python')
  assert.ok(notNil(pythonExtension))
  if (!pythonExtension.isActive) await pythonExtension.activate()

  const extension = extensions.getExtension(`${publisher}.${name}`)
  assert.ok(notNil(extension))
  if (!extension.isActive) await extension.activate()
}
