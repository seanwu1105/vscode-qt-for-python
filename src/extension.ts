import * as vscode from 'vscode';
import { commands } from './commands';
import { EXTENSION_NAME } from './constants';
import * as liveCompilations from './live-compilations';
import { showErrorMessage } from './utils/message';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  liveCompilations.activate();
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

export function deactivate() {
  liveCompilations.deactivate();
}
