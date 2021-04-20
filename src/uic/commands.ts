import * as vscode from 'vscode';
import {
  getActiveWorkspaceFolderPath,
  getFsPathOrActiveDocumentPath,
} from '../paths';
import { compile } from './uic';

export async function compileForm(fileUri?: vscode.Uri) {
  return compile({
    inPath: getFsPathOrActiveDocumentPath(fileUri),
    cwd: getActiveWorkspaceFolderPath(),
  });
}
