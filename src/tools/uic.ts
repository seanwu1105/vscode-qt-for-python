import { fromEventPattern, iif, merge } from 'rxjs';
import { concatMap, mergeMap, switchMap } from 'rxjs/operators';
import * as vscode from 'vscode';
import {
  createPathIfNotExist,
  getActiveWorkspaceFolderPath,
  getFsPathOrActiveDocumentPath,
} from '../utils/paths';
import { PredefinedVariableResolver } from '../utils/predefined-variable-resolver';
import { run } from '../utils/run';
import { createFileWatcher$, enabled$ } from '../utils/watcher';
import { Tool } from './tool';

const NAME = 'uic';

export async function compileForm(fileUri?: vscode.Uri) {
  const inPath = getFsPathOrActiveDocumentPath(fileUri);
  const tool = new Tool(NAME, 'uic', new PredefinedVariableResolver(inPath));
  const outputPath = tool.getOutputPath();
  if (outputPath) createPathIfNotExist(outputPath);
  return run({
    command: `"${await tool.getPath()}" ${tool.args.join(' ')} "${inPath}"`,
    cwd: getActiveWorkspaceFolderPath(),
  });
}

const uiFileWatcher$ = createFileWatcher$('**/*.ui');

const onUiFileChanged$ = uiFileWatcher$.pipe(
  concatMap(watcher =>
    fromEventPattern<vscode.Uri>(handler => watcher.onDidChange(handler))
  )
);

const onUiFileCreated$ = uiFileWatcher$.pipe(
  concatMap(watcher =>
    fromEventPattern<vscode.Uri>(handler => watcher.onDidCreate(handler))
  )
);

export const liveCompilation$ = enabled$('uic').pipe(
  switchMap(enabled =>
    iif(() => enabled, merge(onUiFileChanged$, onUiFileCreated$))
  ),
  mergeMap(uri => compileForm(uri))
);
