import * as path from 'path';
import { EMPTY, iif } from 'rxjs';
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

const NAME = 'lupdate';

export async function updateTranslation(fileUri?: vscode.Uri) {
  const inPath = getFsPathOrActiveDocumentPath(fileUri);
  const tool = new Tool(NAME, new PredefinedVariableResolver(inPath));
  const outputPath =
    (await tool.getOutputPath(['ts'])) ?? getTsPathForPylupdate(tool);
  if (outputPath) createPathIfNotExist(outputPath);
  return run({
    command:
      `${await tool.getPathWithQuotes()} ` +
      `"${inPath}" ` +
      /**
       * The options need to come AFTER the input files due to the wierd CLI
       * requirements from pylupdate5.
       */
      `${tool.args.join(' ')}`,
    cwd: getActiveWorkspaceFolderPath(),
  });
}

/**
 * The TS file output path of pylupdate (both 5 and 6) is flagged with `-ts`
 * instead of a the regular CLI format, such as `--ts`. Thus, we need to parse
 * it manually.
 */
function getTsPathForPylupdate(tool: Tool) {
  const matched = tool.args
    .join(' ')
    .match(/-ts\s+("(?<pathWithSpaces>[\S\s]+)"|(?<path>[\S]+))(\s+|$)/);
  if (matched?.groups) {
    if (matched.groups.pathWithSpaces)
      return path.dirname(matched.groups.pathWithSpaces);
    if (matched.groups.path) return path.dirname(matched.groups.path);
  }
  return;
}

const uiFileWatcher$ = createFileWatcher$('**/*.ui');

export const liveExecution$ = enabled$('lupdate').pipe(
  switchMap(enabled =>
    iif(() => enabled, uiFileWatcher$.pipe(watchFileChangedAndCreated()), EMPTY)
  ),
  mergeMap(uri => updateTranslation(uri))
);
