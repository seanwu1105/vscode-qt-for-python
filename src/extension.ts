import { defer, merge, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as vscode from 'vscode';
import { commands } from './commands';
import { EXTENSION_NAME } from './constants';
import { liveExecution$ as liveUiTranslation$ } from './tools/lupdate';
import { liveExecution$ as liveResourceCompilation$ } from './tools/rcc';
import { liveExecution$ as liveUiCompilation$ } from './tools/uic';
import { showErrorMessage } from './utils/error';

const subscriptions: Subscription[] = [];

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  startLiveCommandExecutions();
}

function registerCommands(context: vscode.ExtensionContext) {
  return commands.map(command =>
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `${EXTENSION_NAME}.${command.name}`,
        async (...args) => {
          try {
            return await command.callback(...args);
          } catch (e: unknown) {
            return showErrorMessage(e);
          }
        }
      )
    )
  );
}

function startLiveCommandExecutions() {
  const liveCommandExecutions$: Observable<any> = merge(
    liveUiCompilation$,
    liveResourceCompilation$,
    liveUiTranslation$
  ).pipe(
    catchError((err: unknown) =>
      defer(() => {
        showErrorMessage(err);
        return liveCommandExecutions$;
      })
    )
  );
  const subscription = liveCommandExecutions$.subscribe();
  subscriptions.push(subscription);
}

export function deactivate() {
  subscriptions.forEach(s => s.unsubscribe());
}
