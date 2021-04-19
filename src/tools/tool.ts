import * as vscode from 'vscode';
import { EXTENSION_NAME } from '../constants';
import { PredefinedVariableResolver } from '../predefined-variable-resolver';
import { python } from '../python';

export class Tool {
  private readonly config = vscode.workspace.getConfiguration(
    `${EXTENSION_NAME}.${this.name}`
  );

  get args() {
    return (this.config.get<string[]>('args') ?? []).map(s =>
      this.predefinedVariableResolver.resolve(s)
    );
  }

  constructor(
    private readonly name: string,
    private readonly filename: string,
    private readonly predefinedVariableResolver = new PredefinedVariableResolver()
  ) {}

  async getPath() {
    const path = this.config.get<string>('path');
    if (path) return path;

    return python('find_tool', [this.filename]);
  }
}
