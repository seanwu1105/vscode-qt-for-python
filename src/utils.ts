// Should NOT depend on vscode

export function notNil<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

export function isNil<T>(
  value: T | undefined | null,
): value is undefined | null {
  return !notNil(value)
}
