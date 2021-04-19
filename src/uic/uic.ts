import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import { PredefinedVariableResolver } from '../predefined-variable-resolver';
import { run } from '../run';
import { Tool } from '../tool';

export class Uic {
  readonly name = 'uic';

  async run({ inPath, cwd }: { inPath: string; cwd?: string }) {
    const tool = new Tool(
      this.name,
      'uic',
      new PredefinedVariableResolver(inPath)
    );
    const outputPath = getOutputPath(tool.args);
    if (outputPath) createPathIfNotExist(outputPath);
    return run({
      command:
        `"${await tool.getPath()}" ` +
        `${tool.args.join(' ')} ` +
        `"${inPath}"`,
      cwd,
    });
  }
}

function getOutputPath(args: string[]) {
  const argv = yargs
    .options({
      o: { type: 'string' },
      output: { type: 'string' },
    })
    .parse(args.join(' '));
  const outputFilePath = argv.o ?? argv.output;
  if (!outputFilePath) return undefined;
  return path.dirname(outputFilePath);
}

function createPathIfNotExist(targetPath: string) {
  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });
  return targetPath;
}
