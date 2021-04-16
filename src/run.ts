import { exec } from 'child_process';
import * as path from 'path';
import { promisify } from 'util';
import * as vscode from 'vscode';
import { assertNotNullable } from './assertions';

export async function python(filePath: string) {
  return run(`${getPython()} ./python/${filePath}`);
}

function getPython() {
  const pythonPath = vscode.workspace
    .getConfiguration('python')
    .get<string>('pythonPath');

  if (!pythonPath) throw new PythonNotInstallError();

  // assume pythonPath is relative to workspace root.
  if (!vscode.workspace.workspaceFolders) return pythonPath;
  return path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, pythonPath);
}

async function run(command: string) {
  return promisify(exec)(command, { cwd: getSrcPath() });
}

function getSrcPath() {
  const extensionId = 'seanwu.vscode-qt-for-python';
  const extensionPath = vscode.extensions.getExtension(extensionId)
    ?.extensionPath;
  assertNotNullable(extensionPath);
  return path.join(extensionPath, 'src');
}

export class PythonNotInstallError extends Error {
  readonly name = 'PythonNotInstallError';
}
