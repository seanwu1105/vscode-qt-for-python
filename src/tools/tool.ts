import { find } from 'lodash-es';
import * as path from 'path';
import * as vscode from 'vscode';
import * as yargs from 'yargs';
import { EXTENSION_NAME, SupportedTool } from '../constants';
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
    private readonly name: SupportedTool,
    private readonly predefinedVariableResolver = new PredefinedVariableResolver()
  ) {}

  async getPathWithQuotes() {
    const path = this.config.get<string>('path');
    if (path) return `"${path}"`;
    return resolvePythonScript(this.name);
  }

  async updatePath(value: string) {
    return this.config.update(
      'path',
      value,
      vscode.ConfigurationTarget.Workspace
    );
  }

  async getOutputPath(keys = ['o', 'output']) {
    const options = Object.fromEntries(
      keys.map(k => [k, { type: 'string' as const }])
    );
    const argv = await yargs.options(options).parse(this.args.join(' '));
    const outputFilePath = find(argv, (v, k) => !!v && keys.includes(k));
    if (!outputFilePath) return;
    return path.dirname(outputFilePath);
  }
}
