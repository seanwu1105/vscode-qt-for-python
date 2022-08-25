// Follow the spec in Visual Studio Code docs:
// https://code.visualstudio.com/docs/editor/variables-reference#_predefined-variables

import * as os from 'node:os'
import * as path from 'node:path'
import { env, window, workspace } from 'vscode'
import { notNil } from './utils'

export function resolvePredefinedVariables(s: string) {
  const resolvedPredefinedVariables = Object.entries(
    predefinedVariables,
  ).reduce((acc, cur) => {
    const [key, value] = cur
    return acc.replaceAll(`$\{${key}}`, value())
  }, s)

  return Object.entries(process.env).reduce((acc, cur) => {
    const [key, value] = cur
    return acc.replaceAll(`$\{env:${key}}`, value ?? '')
  }, resolvedPredefinedVariables)
}

const predefinedVariables = {
  userHome: () => os.homedir(),

  workspaceFolder: () => {
    const fileUri = window.activeTextEditor?.document.uri
    if (notNil(fileUri))
      return workspace.getWorkspaceFolder(fileUri)?.uri.fsPath ?? ''
    return ''
  },

  workspaceFolderBasename: () =>
    path.basename(predefinedVariables.workspaceFolder()),

  file: () => window.activeTextEditor?.document.uri.fsPath ?? '',

  fileWorkspaceFolder: () => predefinedVariables.workspaceFolder(),

  relativeFile: () =>
    path.relative(
      predefinedVariables.workspaceFolder(),
      predefinedVariables.file(),
    ),

  relativeFileDirname: () => path.dirname(predefinedVariables.relativeFile()),

  fileBasename: () => path.basename(predefinedVariables.file()),

  fileBasenameNoExtension: () =>
    path.parse(predefinedVariables.fileBasename()).name,

  fileDirname: () => path.dirname(predefinedVariables.file()),

  fileExtname: () => path.parse(predefinedVariables.fileBasename()).ext,

  // Not support: cwd

  lineNumber: () => {
    const lineIndex = window.activeTextEditor?.selection.active.line
    if (notNil(lineIndex)) return `${lineIndex + 1}`
    return ''
  },

  selectedText: () =>
    window.activeTextEditor?.document.getText(
      window.activeTextEditor.selection,
    ) ?? '',

  execPath: () => env.appRoot,

  // Not support: defaultBuildTask

  pathSeparator: () => path.sep,
}
