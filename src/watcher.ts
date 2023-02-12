import { concatMap, defer, fromEventPattern } from 'rxjs'
import type { GlobPattern } from 'vscode'
import { Disposable, workspace } from 'vscode'
import type { URI } from 'vscode-uri'

// TODO: Unit test
export function getWatcher$(globPattern: GlobPattern) {
  return defer(async () => workspace.createFileSystemWatcher(globPattern)).pipe(
    concatMap(watcher =>
      fromEventPattern<URI>(
        handler =>
          Disposable.from(
            watcher,
            watcher.onDidChange(handler),
            watcher.onDidCreate(handler),
          ),
        (_, disposable) => disposable.dispose(),
      ),
    ),
  )
}
