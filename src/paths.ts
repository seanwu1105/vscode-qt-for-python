import * as path from 'path';
import * as vscode from 'vscode';
import { assertNotNullable } from './assertions';
import { extensionId } from './extension';

export function getSrcPath() {
  const extensionPath = vscode.extensions.getExtension(extensionId)
    ?.extensionPath;
  assertNotNullable(extensionPath);
  return path.join(extensionPath, 'src');
}

export function getActiveWorkspaceFolderPath() {
  if (vscode.workspace.workspaceFolders)
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  return undefined;
}

export function getActiveDocumentPath() {
  return vscode.window.activeTextEditor?.document.uri.fsPath;
}
