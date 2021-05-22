import * as vscode from 'vscode';
import { SupportedTool } from '../constants';
import { Tool } from '../tools/tool';
import { installPythonPackage } from '../utils/python';

export abstract class BaseError extends Error {
  abstract readonly name: string;

  constructor(source?: unknown) {
    let message: string | undefined;
    if (typeof source === 'string') message = source;
    else if (source instanceof Error) message = source.message;
    else message = JSON.stringify(source);
    super(message);
  }
}

export class NotFoundError extends BaseError {
  readonly name = 'NotFoundError';
}

export class ExecutionError extends BaseError {
  readonly name = 'ExecutionError';
}

const QtToolModuleNotFoundError = 'QtToolModuleNotFoundError';

export async function showErrorMessage(error: unknown) {
  if (isQtToolModuleNotFoundErrorMessage(error))
    return handleQtToolModuleNotFoundError(error);
  let message: string;
  if (typeof error === 'string') message = error;
  else if (error instanceof Error) message = `${error.name}: ${error.message}`;
  else message = JSON.stringify(error);
  // eslint-disable-next-line no-console
  console.error(message);
  return vscode.window.showErrorMessage(message);
}

type QtToolModuleNotFoundErrorMessage = `${typeof QtToolModuleNotFoundError}${
  | ` ${SupportedTool}`
  | ''}`;

type QtToolModuleNotFoundErrorType = Error & {
  message: QtToolModuleNotFoundErrorMessage;
};

function isQtToolModuleNotFoundErrorMessage(
  error: unknown
): error is QtToolModuleNotFoundErrorType {
  return (
    error instanceof ExecutionError &&
    error.message.startsWith(QtToolModuleNotFoundError)
  );
}

async function handleQtToolModuleNotFoundError(
  error: QtToolModuleNotFoundErrorType
) {
  const splited = error.message.split(' ');
  const toolName = splited[1] as SupportedTool;

  const setToolPathActionName = 'Set Tool Path';
  const installPySide6ActionName = 'Install PySide6';
  const installPyQt6ActionName = 'Install PyQt6';

  const actionName = await vscode.window.showErrorMessage(
    `Cannot find any installed Qt for Python module to use the ${toolName} tool.`,
    setToolPathActionName,
    installPySide6ActionName,
    installPyQt6ActionName
  );
  if (actionName === setToolPathActionName) return setToolPath(toolName);
  if (actionName === installPySide6ActionName)
    return installPythonPackage('PySide6');
  if (actionName === installPyQt6ActionName)
    return installPythonPackage('PyQt6');
  return;
}

async function setToolPath(toolName: SupportedTool) {
  const toolUri = await vscode.window.showOpenDialog({
    canSelectMany: false,
  });
  if (!toolUri || !toolUri[0]) return;
  return new Tool(toolName).updatePath(toolUri[0].fsPath);
}
