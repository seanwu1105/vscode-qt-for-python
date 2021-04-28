import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { getActiveWorkspaceFolderPath, getSrcPath } from './paths';

export async function resolvePythonScript(fileName: string) {
  return `"${getPythonPath()}" "${getSrcPath()}/python/scripts/${fileName}.py"`;
}

function getPythonPath() {
  const pythonPath =
    vscode.workspace.getConfiguration('python').get<string>('pythonPath') ??
    'python';

  // assume pythonPath is relative to workspace root.
  const activeWorkspaceFolderPath = getActiveWorkspaceFolderPath();
  if (!activeWorkspaceFolderPath) return pythonPath;
  const relativePath = path.join(activeWorkspaceFolderPath, pythonPath);
  if (fs.existsSync(relativePath)) return relativePath;
  return pythonPath;
}

export async function installPythonPackage(pypiPackageName: string) {
  const terminal = vscode.window.createTerminal();
  terminal.show();
  terminal.sendText(`"${getPythonPath()}" -m pip install ${pypiPackageName}`);
}
