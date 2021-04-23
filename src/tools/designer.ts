import * as vscode from 'vscode';
import {
  getActiveWorkspaceFolderPath,
  getFsPathOrActiveDocumentPath,
} from '../utils/paths';
import { PredefinedVariableResolver } from '../utils/predefined-variable-resolver';
import { run } from '../utils/run';
import { Tool } from './tool';

const NAME = 'designer';

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

async function open({
  filePaths = [],
  cwd,
}: {
  filePaths?: string[];
  cwd?: string;
}) {
  const tool = new Tool(NAME, new PredefinedVariableResolver(filePaths[0]));
  return run({
    command:
      `${await tool.getPathWithQuotes()} ` +
      `${tool.args.join(' ')} ` +
      `${filePaths.map(p => `"${p}"`).join(' ')}`,
    cwd,
  });
}
