import { fromEventPattern } from 'rxjs';
import * as vscode from 'vscode';

export const configurationChanged$ =
  fromEventPattern<vscode.ConfigurationChangeEvent>(handler =>
    vscode.workspace.onDidChangeConfiguration(handler)
  );
