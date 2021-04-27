import {
  defer,
  fromEventPattern,
  merge,
  Observable,
  ReplaySubject,
} from 'rxjs';
import {
  concatMap,
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
import { finalizeLast } from './rx-operators';

export function enabled$(toolName: SupportedTool) {
  return defer(async () =>
    vscode.workspace
      .getConfiguration(`${EXTENSION_NAME}.${toolName}`)
      .get<boolean>('liveExecution')
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
    finalizeLast(watcher => watcher.dispose()),
    shareReplay({ bufferSize: 1, refCount: true })
  );
}

export function watchFileChangedAndCreated() {
  return (source$: Observable<vscode.FileSystemWatcher>) =>
    merge(
      source$.pipe(
        concatMap(w => fromEventPattern<vscode.Uri>(h => w.onDidChange(h)))
      ),
      source$.pipe(
        concatMap(w => fromEventPattern<vscode.Uri>(h => w.onDidCreate(h)))
      )
    );
}

type SupportedTool = 'uic' | 'rcc' | 'lupdate';
