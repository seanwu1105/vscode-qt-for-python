import { AssertionError } from 'assert';

export function assertNotNullable<T>(
  value: T | undefined | null
): asserts value {
  if (value === undefined || value === null)
    throw new AssertionError({
      message: `Variable ${getVaraibleName(value)} should not be ${value}.`,
    });
}

function getVaraibleName(variable: any) {
  return Object.keys(variable)[0];
}
