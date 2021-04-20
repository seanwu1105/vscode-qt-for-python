import { defer, fromEventPattern, iif, merge, ReplaySubject } from 'rxjs';
import {
  concatMap,
  concatMapTo,
  distinctUntilChanged,
  map,
  mergeMap,
  repeatWhen,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import * as vscode from 'vscode';
import { configurationChanged$ } from '../configuration';
import { EXTENSION_NAME } from '../constants';
import { finalizeLast, isNonNullable } from '../rx-operators';
import { compileForm } from './commands';
import { NAME } from './uic';

const enabled$ = defer(async () =>
  vscode.workspace
    .getConfiguration(`${EXTENSION_NAME}.${NAME}`)
    .get<boolean>('liveCompilation')
).pipe(
  map(enabled => !!enabled),
  repeatWhen(() => configurationChanged$),
  distinctUntilChanged(),
  shareReplay({ bufferSize: 1, refCount: true })
);

const _uiFileWatcher$ = new ReplaySubject<vscode.FileSystemWatcher>(1);

const uiFileWatcher$ = defer(async () =>
  vscode.workspace.createFileSystemWatcher('**/*.ui', false, false, true)
).pipe(
  tap(watcher => _uiFileWatcher$.next(watcher)),
  concatMapTo(_uiFileWatcher$),
  shareReplay({ bufferSize: 1, refCount: true }),
  isNonNullable(),
  finalizeLast(watcher => watcher.dispose()),
  shareReplay({ bufferSize: 1, refCount: true })
);

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

export const liveCompilation$ = enabled$.pipe(
  switchMap(enabled =>
    iif(() => enabled, merge(onUiFileChanged$, onUiFileCreated$))
  ),
  mergeMap(uri => compileForm(uri))
);
