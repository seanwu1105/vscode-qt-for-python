/* eslint-disable class-methods-use-this */
import * as path from 'path';
import * as vscode from 'vscode';

/**
 * Follow the spec in Visual Studio Code docs:
 * https://code.visualstudio.com/docs/editor/variables-reference#_predefined-variables
 */

interface PredefinedVariables {
  workspaceFolder: string;
  workspaceFolderBasename: string;
  file: string;
  fileWorkspaceFolder: string;
  relativeFile: string;
  relativeFileDirname: string;
  fileBasename: string;
  fileBasenameNoExtension: string;
  fileDirname: string;
  fileExtname: string;
  lineNumber: string;
  selectedText: string;
  execPath: string;
  pathSeparator: string;
}

class PredefinedVariableProvider implements PredefinedVariables {
  get workspaceFolder() {
    if (!vscode.workspace.workspaceFolders) return '';
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
  }

  get workspaceFolderBasename() {
    return path.basename(this.workspaceFolder);
  }

  get file() {
    return (
      this.targetFilePath ??
      vscode.window.activeTextEditor?.document.uri.fsPath ??
      ''
    );
  }

  get fileWorkspaceFolder() {
    const activeFilePath = this.file;
    if (!vscode.workspace.workspaceFolders || !activeFilePath) return '';
    return (
      vscode.workspace.workspaceFolders.find(folder =>
        this.containPath(folder.uri.fsPath, activeFilePath)
      )?.uri.fsPath ?? ''
    );
  }

  get relativeFile() {
    return path.relative(this.workspaceFolder, this.file);
  }

  get relativeFileDirname() {
    return path.dirname(this.relativeFile);
  }

  get fileBasename() {
    return path.basename(this.file);
  }

  get fileBasenameNoExtension() {
    return path.parse(this.fileBasename).name;
  }

  get fileDirname() {
    return path.dirname(this.file);
  }

  get fileExtname() {
    return path.parse(this.fileBasename).ext;
  }

  get lineNumber() {
    return (
      vscode.window.activeTextEditor?.selection.active.line.toString() ?? ''
    );
  }

  get selectedText() {
    if (vscode.workspace.textDocuments.length === 0) return '';
    return vscode.workspace.textDocuments[0].getText(
      vscode.window.activeTextEditor?.selection
    );
  }

  get execPath() {
    return vscode.env.appRoot;
  }

  get pathSeparator() {
    return path.sep;
  }

  constructor(private readonly targetFilePath?: string) {}

  private containPath(parent: string, target: string) {
    const relative = path.relative(parent, target);
    return relative && !relative.startsWith('..') && !path.isAbsolute(relative);
  }
}

export class PredefinedVariableResolver {
  constructor(private readonly targetFilePath?: string) {}

  resolve(str: string) {
    const provider = new PredefinedVariableProvider(this.targetFilePath);
    const predefinedVariables: PredefinedVariables = {
      workspaceFolder: provider.workspaceFolder,
      workspaceFolderBasename: provider.workspaceFolderBasename,
      file: provider.file,
      fileWorkspaceFolder: provider.fileWorkspaceFolder,
      relativeFile: provider.relativeFile,
      relativeFileDirname: provider.relativeFileDirname,
      fileBasename: provider.fileBasename,
      fileBasenameNoExtension: provider.fileBasenameNoExtension,
      fileDirname: provider.fileDirname,
      fileExtname: provider.fileExtname,
      lineNumber: provider.lineNumber,
      selectedText: provider.selectedText,
      execPath: provider.execPath,
      pathSeparator: provider.pathSeparator,
    };

    let resolved = str;

    Object.entries(predefinedVariables).forEach(([name, value]) => {
      resolved = resolved.replaceAll(`$\{${name}}`, `${value}`);
    });

    Object.entries(process.env).forEach(([name, value]) => {
      resolved = resolved.replaceAll(`$\{env:${name}}`, value ?? '');
    });

    return resolved;
  }
}
