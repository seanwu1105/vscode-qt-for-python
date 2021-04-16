import { AssertionError } from 'assert';

export function assertNotNullable<T>(
  value: T | undefined | null
): asserts value {
  if (value === undefined || value === null) throw new AssertionError();
}
