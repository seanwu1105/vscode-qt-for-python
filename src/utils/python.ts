import * as vscode from 'vscode';
import { getExtensionPath } from './paths';

export async function resolvePythonScript(fileName: string) {
  return `"${await getPythonInterpreterPath()}" "${getExtensionPath()}/python/scripts/${fileName}.py"`;
}

async function getPythonInterpreterPath(): Promise<string> {
  // Get path with the Python extension public API: https://github.com/microsoft/vscode-python/blob/main/src/client/api.ts#L135
  const pythonExtensionApi = await vscode.extensions
    .getExtension('ms-python.python')
    ?.activate();
  const pythonExecCommand =
    pythonExtensionApi?.settings.getExecutionDetails().execCommand;
  if (pythonExecCommand) return pythonExecCommand[0];
  return 'python';
}

export async function installPythonPackage(pypiPackageName: string) {
  const terminal = vscode.window.createTerminal();
  terminal.show();
  terminal.sendText(
    `"${await getPythonInterpreterPath()}" -m pip install ${pypiPackageName}`
  );
}
