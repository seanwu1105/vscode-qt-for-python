import * as vscode from 'vscode';
import { assertNotNullable } from './assertions';
import { getActiveDocumentPath, getActiveWorkspaceFolderPath } from './paths';
import { Designer } from './tools/designer';

async function newForm(dirUri?: vscode.Uri) {
  return new Designer().open({ cwd: dirUri?.fsPath });
}

async function editForm(fileUri?: vscode.Uri) {
  let filePath: string;
  if (fileUri) filePath = fileUri.fsPath;
  else {
    const activeDocumentPath = getActiveDocumentPath();
    assertNotNullable(activeDocumentPath);
    filePath = activeDocumentPath;
  }
  return new Designer().open({
    filePaths: [filePath],
    cwd: getActiveWorkspaceFolderPath(),
  });
}

interface Command {
  readonly name: string;
  callback(...args: any[]): any;
}

export const commands: Command[] = [
  {
    name: 'newForm',
    callback: newForm,
  },
  {
    name: 'editForm',
    callback: editForm,
  },
];
