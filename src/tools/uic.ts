import { iif } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import * as vscode from 'vscode';
import {
  createPathIfNotExist,
  getActiveWorkspaceFolderPath,
  getFsPathOrActiveDocumentPath,
} from '../utils/paths';
import { PredefinedVariableResolver } from '../utils/predefined-variable-resolver';
import { run } from '../utils/run';
import {
  createFileWatcher$,
  enabled$,
  watchFileChangedAndCreated,
} from '../utils/watcher';
import { Tool } from './tool';

const NAME = 'uic';

export async function compileForm(fileUri?: vscode.Uri) {
  const inPath = getFsPathOrActiveDocumentPath(fileUri);
  const tool = new Tool(NAME, new PredefinedVariableResolver(inPath));
  const outputPath = tool.getOutputPath();
  if (outputPath) createPathIfNotExist(outputPath);
  return run({
    command:
      `${await tool.getPathWithQuotes()} ` +
      `${tool.args.join(' ')} "${inPath}"`,
    cwd: getActiveWorkspaceFolderPath(),
  });
}

const uiFileWatcher$ = createFileWatcher$('**/*.ui');

export const liveExecution$ = enabled$('uic').pipe(
  switchMap(enabled =>
    iif(() => enabled, uiFileWatcher$.pipe(watchFileChangedAndCreated()))
  ),
  mergeMap(uri => compileForm(uri))
);
