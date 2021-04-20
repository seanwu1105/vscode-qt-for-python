import * as vscode from 'vscode';
import {
  getActiveWorkspaceFolderPath,
  getFsPathOrActiveDocumentPath,
} from '../paths';
import { open } from './designer';

export async function newForm(dirUri?: vscode.Uri) {
  return open({ cwd: dirUri?.fsPath });
}

export async function editForm(fileUri?: vscode.Uri) {
  const filePath = getFsPathOrActiveDocumentPath(fileUri);
  return open({
    filePaths: [filePath],
    cwd: getActiveWorkspaceFolderPath(),
  });
}
