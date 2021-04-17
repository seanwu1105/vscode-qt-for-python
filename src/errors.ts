export abstract class BaseError extends Error {
  abstract readonly name: string;

  constructor(source?: unknown) {
    let message: string | undefined;
    if (typeof source === 'string') message = source;
    else if (source instanceof Error) message = source.message;
    else message = JSON.stringify(source);
    super(message);
  }
}

export class NotFoundError extends BaseError {
  readonly name = 'NotFoundError';
}
