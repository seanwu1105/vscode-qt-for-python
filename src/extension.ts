import * as vscode from 'vscode';
import { python } from './run';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'vscode-qt-for-python.helloWorld',
      async () => {
        try {
          // eslint-disable-next-line no-console
          console.log(await python('packages_path.py'));
        } catch (err: unknown) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }
    )
  );
}
