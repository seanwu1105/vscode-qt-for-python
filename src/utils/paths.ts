import * as fs from 'fs';
import * as vscode from 'vscode';
import { EXTENSION_ID } from '../constants';
import { assertNotNullable } from './assertions';

export function getExtensionPath() {
  const extensionPath = vscode.extensions.getExtension(EXTENSION_ID)
    ?.extensionPath;
  assertNotNullable(extensionPath);
  return extensionPath;
}

export function getActiveWorkspaceFolderPath() {
  if (
    !vscode.workspace.workspaceFolders ||
    !vscode.workspace.workspaceFolders[0]
  )
    return;
  return vscode.workspace.workspaceFolders[0].uri.fsPath;
}

export function getActiveDocumentPath() {
  return vscode.window.activeTextEditor?.document.uri.fsPath;
}

export function getFsPathOrActiveDocumentPath(uri?: vscode.Uri) {
  let filePath: string;
  if (uri) filePath = uri.fsPath;
  else {
    const activeDocumentPath = getActiveDocumentPath();
    assertNotNullable(activeDocumentPath);
    filePath = activeDocumentPath;
  }
  return filePath;
}

export function createPathIfNotExist(targetPath: string) {
  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });
  return targetPath;
}
