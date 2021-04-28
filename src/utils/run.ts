import { exec } from 'child_process';
import { promisify } from 'util';
import { ExecutionError } from './error';

export async function run({ command, cwd }: { command: string; cwd?: string }) {
  try {
    const { stdout, stderr } = await promisify(exec)(command, { cwd });
    if (stderr) throw new ExecutionError(stderr);
    return stdout;
  } catch (e: unknown) {
    throw new ExecutionError(e);
  }
}
