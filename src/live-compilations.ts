import { merge, Subscription } from 'rxjs';
import { liveCompilation$ as liveUiCompilation$ } from './uic/live-compilation';

const liveCompilations$ = merge(liveUiCompilation$);

let subscription: Subscription | undefined;

export function activate() {
  subscription = liveCompilations$.subscribe();
}

export function deactivate() {
  subscription?.unsubscribe();
}
