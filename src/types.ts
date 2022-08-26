// Should NOT depend on vscode

export type SupportedTool = 'qmllint'

export type SuccessResult<T, Name extends string = ''> = {
  readonly kind: `${Name}Success`
  readonly value: T
}

export type ErrorResult<Name extends string> = {
  readonly kind: `${Name}Error`
  readonly message: string
}
