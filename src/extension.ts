import * as vscode from 'vscode';
import { name, publisher } from '../package.json';
import { commands } from './commands';
import { showErrorMessage } from './message';

export const extensionId = `${publisher}.${name}`;
export const extensionName = 'qtForPython';

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
}

function registerCommands(context: vscode.ExtensionContext) {
  return commands.map(command =>
    context.subscriptions.push(
      vscode.commands.registerCommand(
        `${extensionName}.${command.name}`,
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
