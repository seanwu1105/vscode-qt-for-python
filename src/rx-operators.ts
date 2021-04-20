import { defer, Observable } from 'rxjs';
import { filter, finalize, tap } from 'rxjs/operators';

export function isNonNullable<T>() {
  return (source$: Observable<null | undefined | T>) =>
    source$.pipe(
      filter((v): v is NonNullable<T> => v !== null && v !== undefined)
    );
}

export function finalizeLast<T>(callback: (value: T) => void) {
  return (source$: Observable<T>) =>
    defer(() => {
      let lastValue: T | undefined;
      return source$.pipe(
        tap(value => (lastValue = value)),
        finalize(() => {
          if (lastValue) callback(lastValue);
        })
      );
    });
}
