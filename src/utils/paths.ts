import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { EXTENSION_ID } from '../constants';
import { assertNotNullable } from './assertions';

export function getSrcPath() {
  const extensionPath = vscode.extensions.getExtension(EXTENSION_ID)
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
