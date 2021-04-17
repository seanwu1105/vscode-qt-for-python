import { run } from '../run';
import { Tool } from './tool';

export class Designer {
  private readonly tool = new Tool('designer', 'designer');

  async open({ filePaths = [], cwd }: { filePaths?: string[]; cwd?: string }) {
    return run({
      command: `${await this.tool.getPath()} ${filePaths.join(' ')}`,
      cwd,
    });
  }
}
