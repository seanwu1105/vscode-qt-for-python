import { merge, Subscription } from 'rxjs';
import { liveCompilation$ as liveResourceCompilation$ } from './tools/rcc';
import { liveCompilation$ as liveUiCompilation$ } from './tools/uic';

const liveCompilations$ = merge(liveUiCompilation$, liveResourceCompilation$);

let subscription: Subscription | undefined;

export function activate() {
  subscription = liveCompilations$.subscribe();
}

export function deactivate() {
  subscription?.unsubscribe();
}
