// Follow the spec in Visual Studio Code docs with some modifications:
// https://code.visualstudio.com/docs/editor/variables-reference#_predefined-variables

import * as os from 'node:os'
import * as path from 'node:path'
import { env, window, workspace } from 'vscode'
import type { URI } from 'vscode-uri'
import { isNil, notNil } from './utils'

export function resolvePredefinedVariables({
  str,
  resource,
}: ResolvePredefinedVariablesArgs) {
  const resolvedPredefinedVariables = Object.entries(
    getResolver(resource),
  ).reduce((acc, cur) => {
    const [key, value] = cur
    return acc.replaceAll(`$\{${key}}`, value())
  }, str)

  return Object.entries(process.env).reduce((acc, cur) => {
    const [key, value] = cur
    return acc.replaceAll(`$\{env:${key}}`, value ?? '')
  }, resolvedPredefinedVariables)
}

type ResolvePredefinedVariablesArgs = {
  readonly str: string
  readonly resource: URI | undefined
}

function getResolver(resource: URI | undefined) {
  return {
    userHome: () => os.homedir(),

    workspaceFolder: () => {
      const fileUri = window.activeTextEditor?.document.uri
      if (notNil(fileUri))
        return workspace.getWorkspaceFolder(fileUri)?.uri.fsPath ?? ''
      return ''
    },

    workspaceFolderBasename: () =>
      path.basename(getResolver(resource).workspaceFolder()),

    file: () => window.activeTextEditor?.document.uri.fsPath ?? '',

    fileWorkspaceFolder: () => getResolver(resource).workspaceFolder(),

    relativeFile: () =>
      path.relative(
        getResolver(resource).workspaceFolder(),
        getResolver(resource).file(),
      ),

    relativeFileDirname: () =>
      path.dirname(getResolver(resource).relativeFile()),

    fileBasename: () => path.basename(getResolver(resource).file()),

    fileBasenameNoExtension: () =>
      path.parse(getResolver(resource).fileBasename()).name,

    fileDirname: () => path.dirname(getResolver(resource).file()),

    fileExtname: () => path.parse(getResolver(resource).fileBasename()).ext,

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

    // -- Additional Variables --

    resource: () => resource?.fsPath ?? '',

    resourceWorkspaceFolder: () =>
      isNil(resource)
        ? ''
        : workspace.getWorkspaceFolder(resource)?.uri.fsPath ?? '',

    relativeResource: () =>
      path.relative(
        getResolver(resource).resourceWorkspaceFolder(),
        getResolver(resource).resource(),
      ),

    relativeResourceDirname: () =>
      path.dirname(getResolver(resource).relativeResource()),

    resourceBasename: () => path.basename(getResolver(resource).resource()),

    resourceBasenameNoExtension: () =>
      path.parse(getResolver(resource).resourceBasename()).name,

    resourceDirname: () => path.dirname(getResolver(resource).resource()),

    resourceExtname: () =>
      path.parse(getResolver(resource).resourceBasename()).ext,
  }
}
