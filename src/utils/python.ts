import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { NotFoundError } from './errors';
import { getActiveWorkspaceFolderPath, getSrcPath } from './paths';

export async function resolvePythonScript(fileName: string) {
  return `"${getPythonPath()}" "${getSrcPath()}/python/${fileName}.py"`;
}

function getPythonPath() {
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
