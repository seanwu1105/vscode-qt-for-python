import * as path from 'path';
import * as vscode from 'vscode';

export class VariableResolver {
    private predefinedVariables: { [variableName: string]: () => string; } = {
        workspaceFolder: this.getWorkspaceFolder,
        workspaceFolderBasename: () => {
            return path.basename(this.getWorkspaceFolder());
        },
        file: this.getFileName,
        relativeFile: () => {
            return path.relative(this.getWorkspaceFolder(), this.getFileName());
        },
        fileBasename: () => {
            return path.basename(this.getFileName());
        },
        fileBasenameNoExtension: () => {
            return path.parse(this.getFileName()).name;
        },
        fileDirname: () => {
            return path.parse(this.getFileName()).dir;
        },
        fileExtname: () => {
            return path.extname(this.getFileName());
        },
        lineNumber: () => {
            return this.getActiveSelection().active.line.toString();
        },
        selectedText: () => {
            return vscode.workspace.textDocuments[0].getText(
                this.getActiveSelection()
            );
        }
    };
    constructor() { }
    resolve(command: string): string {
        for (let variableName in this.predefinedVariables) {
            command = command.replace(
                `\$\{${variableName}\}`,
                `${this.predefinedVariables[variableName]()}`
            );
        }
        for (let variableName in process.env) {
            let value = process.env[variableName];
            if (value) {
                command = command.replace(`\$\{env:${variableName}\}`, value);
            }
        }
        return command;
    }

    private getWorkspaceFolder(): string {
        if (vscode.workspace.workspaceFolders) {
            return vscode.workspace.workspaceFolders[0].uri.fsPath;
        } else {
            let errMsg = 'Cannot resolve ${workspaceFolder}. Make sure you ' +
                'have opened at least one folder.';
            vscode.window.showErrorMessage(errMsg);
            throw ReferenceError(errMsg);
        }
    }

    private getFileName(): string {
        if (vscode.window.activeTextEditor) {
            return vscode.window.activeTextEditor.document.fileName;
        } else {
            let errMsg = 'Cannot resolve ${file}. Make sure you have opened ' +
                'at least one text editor with document.';
            vscode.window.showErrorMessage(errMsg);
            throw ReferenceError(errMsg);
        }
    }

    private getActiveSelection(): vscode.Selection {
        if (vscode.window.activeTextEditor) {
            return vscode.window.activeTextEditor.selection;
        } else {
            let errMsg = 'Cannot resolve ${lineNumber} or ${selectedText}. ' +
                'Make sure you have open at least one text editor with document.';
            vscode.window.showErrorMessage(errMsg);
            throw ReferenceError(errMsg);
        }
    }
}