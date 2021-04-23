import * as path from 'path';
import * as vscode from 'vscode';
import * as yargs from 'yargs';
import { EXTENSION_NAME } from '../constants';
import { PredefinedVariableResolver } from '../utils/predefined-variable-resolver';
import { resolvePythonScript } from '../utils/python';

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
    private readonly predefinedVariableResolver = new PredefinedVariableResolver()
  ) {}

  async getPathWithQuotes() {
    const path = this.config.get<string>('path');
    if (path) return `"${path}"`;
    return resolvePythonScript(this.name);
  }

  getOutputPath() {
    const argv = yargs
      .options({
        o: { type: 'string' },
        output: { type: 'string' },
      })
      .parse(this.args.join(' '));
    const outputFilePath = argv.o ?? argv.output;
    if (!outputFilePath) return undefined;
    return path.dirname(outputFilePath);
  }
}
