import { PredefinedVariableResolver } from '../predefined-variable-resolver';
import { run } from '../run';
import { Tool } from '../tool';

const NAME = 'designer';

export async function open({
  filePaths = [],
  cwd,
}: {
  filePaths?: string[];
  cwd?: string;
}) {
  const tool = new Tool(
    NAME,
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
