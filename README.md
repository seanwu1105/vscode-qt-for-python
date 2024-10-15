# Visual Studio Code Extension Qt for Python

> ⚠️ This project is deprecated. Use [the official Qt Extensions](https://marketplace.visualstudio.com/items?itemName=TheQtCompany.qt) instead.

[![build](https://github.com/seanwu1105/vscode-qt-for-python/workflows/build/badge.svg)](https://github.com/seanwu1105/vscode-qt-for-python/actions?query=workflow:build)
[![version](https://img.shields.io/visual-studio-marketplace/v/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![rating](https://img.shields.io/visual-studio-marketplace/r/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![downloads](https://img.shields.io/visual-studio-marketplace/d/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![installs](https://img.shields.io/visual-studio-marketplace/i/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)

A Visual Studio Code extension for PySide6, PySide2, PyQt6 and PyQt5.

## Highlight Features

All features support multi-root workspace project.

### QML

- Syntax highlighting (`qml` and `qmldir` files)
- Linting (requires PySide6 >= 6.3)
  - Support `.qmllint.ini` configuration file
- Code completion (requires PySide6 >= 6.4)
- Preview QML file in a separate window (requires PySide6)
- Format QML file (requires PySide6 >= 6.5.2)

### Qt UI Files

- Syntax highlighting (`ui` files)
- Compile to Python code
- Continuous compilation
- Create and edit UI file with Qt Designer (requires PySide6 or PySide2)

### Qt Resource Files

- Syntax highlighting (`qrc` files)
- Compile to Python code (requires PySide6, PySide2, or PyQt5)
- Continuous compilation

### Qt Style Sheets

- Syntax highlighting (`qss` files)
- Provide color picker for HEX, RGBA, HSVA, and HSLA code

### Qt Translation Files

- Syntax highlighting (`ts` files)
- Extract translation strings from Python, QML and UI files
- Edit translations with Qt Linguist (requires PySide6)
- Compile to binary translation files (requires PySide6)

## Supported Environment Variables

The following list shows the supported variables you can use in extension
configurations.

### Predefined Variables

- `${userHome}` - the path of the user's home folder
- `${workspaceFolder}` - the path of the folder opened in VS Code
- `${workspaceFolderBasename}` - the name of the folder opened in VS Code
  without any slashes (/)
- `${file}` - the current opened file
- `${fileWorkspaceFolder}` - the current opened file's workspace folder
- `${relativeFile}` - the current opened file relative to workspaceFolder
- `${relativeFileDirname}` - the current opened file's dirname relative to
  workspaceFolder
- `${fileBasename}` - the current opened file's basename
- `${fileBasenameNoExtension}` - the current opened file's basename with no file
  extension
- `${fileDirname}` - the current opened file's dirname
- `${fileExtname}` - the current opened file's extension
- ~~`${cwd}` - the task runner's current working directory upon the startup of
  VS Code~~ (currently not supported)
- `${lineNumber}` - the current selected line number in the active file
- `${selectedText}` - the current selected text in the active file
- `${execPath}` - the path to the running VS Code executable
- ~~`${defaultBuildTask}` - the name of the default build task~~ (currently not
  supported)
- `${pathSeparator}` - the character used by the operating system to separate
  components in file paths
- `${resource}` - the path of the target file
- `${resourceWorkspaceFolder}` - the target file's workspace folder
- `${relativeResource}` - the target file relative to it's workspaceFolder
- `${relativeResourceDirname}` - the target file's dirname relative to it's
  workspaceFolder
- `${resourceBasename}` - the target file's basename
- `${resourceBasenameNoExtension}` - the target file's basename with no file
  extension
- `${resourceDirname}` - the path of the target file's dirname
- `${resourceExtname}` - the target file's extension

> The example of predefined variables can be found
> [here](https://code.visualstudio.com/docs/editor/variables-reference).

### System Environment Variables

You can also reference environment variables through the `${env:Name}` syntax
(for example, `${env:USER}`).

> Be sure to match the environment variable name's casing, for example,
> `${env:Path}` on Windows.

## Release Notes

Please see the release notes in [CHANGELOG](CHANGELOG.md).

## Contributing

Please see how to contribute in [CONTRIBUTING](CONTRIBUTING.md).
