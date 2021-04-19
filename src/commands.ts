import * as vscode from 'vscode';
import { assertNotNullable } from './assertions';
import { Designer } from './designer/designer';
import { getActiveDocumentPath, getActiveWorkspaceFolderPath } from './paths';
import { Uic } from './uic/uic';

async function newForm(dirUri?: vscode.Uri) {
  return new Designer().run({ cwd: dirUri?.fsPath });
}

async function editForm(fileUri?: vscode.Uri) {
  const filePath = getFsPathOrActiveDocumentPath(fileUri);
  return new Designer().run({
    filePaths: [filePath],
    cwd: getActiveWorkspaceFolderPath(),
  });
}

async function compileForm(fileUri?: vscode.Uri) {
  const uic = new Uic();

  return uic.run({
    inPath: getFsPathOrActiveDocumentPath(fileUri),
    cwd: getActiveWorkspaceFolderPath(),
  });
}

function getFsPathOrActiveDocumentPath(uri?: vscode.Uri) {
  let filePath: string;
  if (uri) filePath = uri.fsPath;
  else {
    const activeDocumentPath = getActiveDocumentPath();
    assertNotNullable(activeDocumentPath);
    filePath = activeDocumentPath;
  }
  return filePath;
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
  {
    name: 'compileForm',
    callback: compileForm,
  },
];
