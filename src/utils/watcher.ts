import { defer, ReplaySubject } from 'rxjs';
import {
  concatMapTo,
  distinctUntilChanged,
  map,
  repeatWhen,
  shareReplay,
  tap,
} from 'rxjs/operators';
import * as vscode from 'vscode';
import { EXTENSION_NAME } from '../constants';
import { configurationChanged$ } from './configuration';
import { finalizeLast, isNonNullable } from './rx-operators';

export function enabled$(toolName: SupportedTool) {
  return defer(async () =>
    vscode.workspace
      .getConfiguration(`${EXTENSION_NAME}.${toolName}`)
      .get<boolean>('liveCompilation')
  ).pipe(
    map(enabled => !!enabled),
    repeatWhen(() => configurationChanged$),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}

export function createFileWatcher$(pattern: string) {
  const watcher$ = new ReplaySubject<vscode.FileSystemWatcher>(1);
  return defer(async () =>
    vscode.workspace.createFileSystemWatcher(pattern)
  ).pipe(
    tap(watcher => watcher$.next(watcher)),
    concatMapTo(watcher$),
    shareReplay({ bufferSize: 1, refCount: true }),
    isNonNullable(),
    finalizeLast(watcher => watcher.dispose()),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}

type SupportedTool = 'uic' | 'rcc';
