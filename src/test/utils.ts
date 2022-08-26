// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DEFAULT_SLEEP_TIME = process.env['CI'] === 'true' ? 30000 : 1000

export async function sleep(ms = DEFAULT_SLEEP_TIME) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
