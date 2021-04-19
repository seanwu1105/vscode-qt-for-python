import * as vscode from 'vscode';

export async function showErrorMessage(error: unknown) {
  let message: string;
  if (typeof error === 'string') message = error;
  else if (error instanceof Error) message = `${error.name}: ${error.message}`;
  else message = JSON.stringify(error);
  // eslint-disable-next-line no-console
  console.error(message);
  vscode.window.showErrorMessage(message);
}
