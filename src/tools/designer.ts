import { PredefinedVariableResolver } from '../predefined-variable-resolver';
import { run } from '../run';
import { Tool } from './tool';

export class Designer {
  readonly name = 'designer';

  async run({ filePaths = [], cwd }: { filePaths?: string[]; cwd?: string }) {
    const tool = new Tool(
      this.name,
      'designer',
      new PredefinedVariableResolver(filePaths[0])
    );
    return run({
      command:
        `"${await tool.getPath()}" ` +
        `${tool.args.join(' ')} ` +
        `${filePaths.map(p => `"${p}"`).join(' ')}`,
      cwd,
    });
  }
}
