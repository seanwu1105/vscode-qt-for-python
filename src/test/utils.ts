// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const DEFAULT_SLEEP_TIME = process.env['CI'] === 'true' ? 2000 : 1000
const DEFAULT_TIMEOUT_FACTOR = 20

export async function waitFor<R>(
  f: () => R,
  {
    timeout = DEFAULT_SLEEP_TIME * DEFAULT_TIMEOUT_FACTOR,
    interval = DEFAULT_SLEEP_TIME,
  }: WaitForOptions = {
    timeout: DEFAULT_SLEEP_TIME * DEFAULT_TIMEOUT_FACTOR,
    interval: DEFAULT_SLEEP_TIME,
  },
) {
  let hasTimeout = false

  setTimeout(() => (hasTimeout = true), timeout)

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (!hasTimeout) {
    try {
      return f()
    } catch (e) {
      await sleep(interval)
    }
  }

  return f()
}

type WaitForOptions = {
  readonly timeout?: number
  readonly interval?: number
}

export async function sleep(ms = DEFAULT_SLEEP_TIME) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
