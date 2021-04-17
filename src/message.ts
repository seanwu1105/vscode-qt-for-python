import * as vscode from 'vscode';

export async function showErrorMessage(error: unknown) {
  let message: string;
  if (typeof error === 'string') message = error;
  else if (error instanceof Error) message = `${error.name}: ${error.message}`;
  else message = JSON.stringify(error);
  vscode.window.showErrorMessage(message);
}
