import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { BaseError, NotFoundError } from './errors';
import { getActiveWorkspaceFolderPath, getSrcPath } from './paths';
import { run } from './run';

export async function python(fileName: string, args: string[]) {
  try {
    return run({
      command: `${getPython()} ./python/${fileName}.py ${args.join(' ')}`,
      cwd: getSrcPath(),
    });
  } catch (e: unknown) {
    throw new PythonRunTimeError(e);
  }
}

function getPython() {
  const pythonPath = vscode.workspace
    .getConfiguration('python')
    .get<string>('pythonPath');

  if (!pythonPath) throw new NotFoundError('Python not found with pythonPath.');

  // assume pythonPath is relative to workspace root.
  const activeWorkspaceFolderPath = getActiveWorkspaceFolderPath();
  if (!activeWorkspaceFolderPath) return pythonPath;
  const relativePath = path.join(activeWorkspaceFolderPath, pythonPath);
  if (fs.existsSync(relativePath)) return relativePath;
  return pythonPath;
}

export class PythonRunTimeError extends BaseError {
  readonly name = 'PythonRunTimeError';
}
