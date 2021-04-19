import * as vscode from 'vscode';
import { commands } from './commands';
import { EXTENSION_NAME } from './constants';
import { showErrorMessage } from './message';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
}

function registerCommands(context: vscode.ExtensionContext) {
  return commands.map(command =>
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `${EXTENSION_NAME}.${command.name}`,
        async (...args) => {
          try {
            const result = await command.callback(...args);
            // eslint-disable-next-line no-console
            console.log(result);
            return result;
          } catch (e: unknown) {
            return showErrorMessage(e);
          }
        }
      )
    )
  );
}
