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
