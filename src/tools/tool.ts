import * as vscode from 'vscode';
import { pathConfigBaseName } from '../configuration';
import { python } from '../python';

export class Tool {
  constructor(
    private readonly name: string,
    private readonly filename: string
  ) {}

  async getPath() {
    const toolPath = vscode.workspace
      .getConfiguration(pathConfigBaseName)
      .get<string>(this.name);
    // eslint-disable-next-line no-console
    console.log(pathConfigBaseName, this.name, toolPath);
    if (toolPath) return toolPath;

    return python('find_tool', [this.filename]);
  }
}
