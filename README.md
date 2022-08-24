# Visual Studio Code Extension Qt for Python

## Next Release TODOs

- [x] `qmllint` integration
  - [x] `qmllint` language server
    - [x] Support multi-root projects
  - [x] Support `.qmllint.ini` file
- [x] Show errors on notification
- [x] Handle exceptions from Python scripts
  - [x] Drop support to install Python dependencies
- [x] Support spaces in paths
- [x] Unit tests for ALL TypeScript scripts
- [ ] Resolve predefined variables in tool paths
- [ ] Configurations
  - [x] Enable/disable `qmllint` integration
  - [ ] Set qmllint path
  - [ ] Set qmllint args
  - [x] Support multi-root projects
    - [x] includes Python configuration
- [ ] Ensures we use resource scope
  - [ ] Support user-defined tool args
  - [ ] Support user-defined tool paths
- [ ] Build e2e tests
- [ ] Languages highlighting
- [ ] Simple tools integration
- [ ] Continuous compilation

[![build](https://github.com/seanwu1105/vscode-qt-for-python/workflows/build/badge.svg)](https://github.com/seanwu1105/vscode-qt-for-python/actions?query=workflow:build)
[![version](https://img.shields.io/visual-studio-marketplace/v/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![rating](https://img.shields.io/visual-studio-marketplace/r/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![downloads](https://img.shields.io/visual-studio-marketplace/d/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![installs](https://img.shields.io/visual-studio-marketplace/i/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)

A Visual Studio Code extension provides some common untilities for PySide6,
PyQt6 and PyQt5.

|       Qt Markup Language (`qml`)        |         Qt Style Sheets (`qss`)         |    Resource Collection Files (`qrc`)    |
| :-------------------------------------: | :-------------------------------------: | :-------------------------------------: |
| ![qml](https://i.imgur.com/YDWuDDJ.png) | ![qss](https://i.imgur.com/N1w3vs9.png) | ![qrc](https://i.imgur.com/6qW1YTI.png) |

|          `qmake` Files (`pro`)          |    Qt Linguist Translation (`qt.ts`)     |   QML Module Definition Files (`qmldir`)   |
| :-------------------------------------: | :--------------------------------------: | :----------------------------------------: |
| ![pro](https://i.imgur.com/kI3m5c4.png) | ![qtts](https://i.imgur.com/TnizAQd.png) | ![qmldir](https://i.imgur.com/F6NH69h.png) |

## Highlight Features

- Qt Markup Language (`*.qml`) highlighting and snippets support
- QML Module Definition Files (`*.qmldir`) highlighting and snippets support
- Qt Style Sheets (`*.qss`) highlighting and snippets support
- Qt Linguist Translation (`*.qt.ts`) highlighting support (XML)
- Resource Collection Files (`*.qrc`) highlighting support (XML)
- Qt Designer Form (`*.ui`) highlighting support (XML)
- Qt Creator User Settings (`*.pro.user`) highlighting support (XML)
- `qmake` highlighting support
- New or open form (Qt Designer `*.ui` file)
  - Automatically get `designer` from installed Qt for Python modules or set
    manually
- Compile form (Qt Designer `*.ui` file) into Python file (require PySide6,
  PyQt6, PySide2 or PyQt5 to be installed)
  - Automatically get `uic` from installed Qt for Python modules or set manually
  - Automatically re-compile on form files changed
- Update translation (Qt Linguist `*.qt.ts` file) from Python file (require
  PyQt6, PySide2 or PyQt5 to be installed)
  - Automatically get `lupdate` from installed Qt for Python modules or set
    manually
  - Automatically re-update on form files changed
- Compile Qt Resource File (`*.qrc`) into Python file (require PySide6, PySide2
  or PyQt5 to be installed)
  - Automatically get `rcc` from installed Qt for Python modules or set manually
  - Automatically re-compile on resource files changed

## Supported Environment Variables

The following list shows the supported environment variables you can use for the
path of Qt tools in configurations.

### Predefined Variables

- `${workspaceFolder}` - the path of the folder opened in VS Code
- `${workspaceFolderBasename}` - the name of the folder opened in VS Code
  without any slashes (/)
- `${file}` - the current opened file
- `${fileWorkspaceFolder}` - the current opened file's workspace folder
- `${relativeFile}` - the current opened file relative to `workspaceFolder`
- `${relativeFileDirname}` - the current opened file's dirname relative to
  `workspaceFolder`
- `${fileBasename}` - the current opened file's basename
- `${fileBasenameNoExtension}` - the current opened file's basename with no file
  extension
- `${fileDirname}` - the current opened file's dirname
- `${fileExtname}` - the current opened file's extension
- `${cwd}` - the task runner's current working directory on startup
- `${lineNumber}` - the current selected line number in the active file
- `${selectedText}` - the current selected text in the active file
- `${execPath}` - the path to the running VS Code executable
- ~~`${defaultBuildTask}` - the name of the default build task~~ (currently not
  supported)
- `${pathSeparator}` - the character used by the operating system to separate
  components in file paths

> The example of predefined variables can be found
> [here](https://code.visualstudio.com/docs/editor/variables-reference).

### System Environment Variables

You can also reference environment variables through the `${env:Name}` syntax
(for example, `${env:USER}`).

> Be sure to match the environment variable name's casing, for example,
> `${env:Path}` on Windows.

## Requirements

- Python
- [Python Visual Studio Code Extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
  with `python.pythonPath` configuration (defaults to `python`)
- Qt for Python packages including PySide6, PyQt6, PySide2 and PyQt5.

## Release Notes

Please see the release notes in [CHANGELOG](CHANGELOG.md).
