// Should NOT depend on vscode

import type { Subscription } from 'rxjs'
import { Disposable } from 'vscode'

export function notNil<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export function isNil<T>(
  value: T | undefined | null,
): value is undefined | null {
  return !notNil(value)
}

export function toDisposable(subscription: Subscription) {
  return new Disposable(() => subscription.unsubscribe())
}

// TODO: Remove this one.
export function withConcatMap<E>(callback: (event: E) => Promise<void>) {
  const queue: E[] = []

  return async (event: E) => {
    queue.push(event)

    if (queue.length > 1) return // Already running, leave this new one for later.

    while (queue.length > 0) {
      const event = queue[0]
      if (isNil(event)) continue

      await callback(event)

      queue.shift()
    }
  }
}
