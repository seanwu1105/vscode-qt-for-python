# Visual Studio Code Extension Qt for Python

[![version](https://img.shields.io/visual-studio-marketplace/v/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![rating](https://img.shields.io/visual-studio-marketplace/r/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![downloads](https://img.shields.io/visual-studio-marketplace/d/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![installs](https://img.shields.io/visual-studio-marketplace/i/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![dependencies Status](https://david-dm.org/seanwu1105/vscode-qt-for-python/status.svg)](https://david-dm.org/seanwu1105/vscode-qt-for-python)
[![devDependencies Status](https://david-dm.org/seanwu1105/vscode-qt-for-python/dev-status.svg)](https://david-dm.org/seanwu1105/vscode-qt-for-python?type=dev)

A Visual Studio Code extension provides some common functionalities for PyQt5 and PySide2 with Qt Creator.

|        Qt Markup Language (`qml`)       |         Qt Style Sheets (`qss`)         |    Resource Collection Files (`qrc`)    |
|:---------------------------------------:|:---------------------------------------:|:---------------------------------------:|
| ![qml](https://i.imgur.com/YDWuDDJ.png) | ![qss](https://i.imgur.com/N1w3vs9.png) | ![qrc](https://i.imgur.com/6qW1YTI.png) |

|          `qmake` Files (`pro`)          |     Qt Linguist Translation (`qt.ts`)    |   QML Module Definition Files (`qmldir`)   |
|:---------------------------------------:|:----------------------------------------:|:------------------------------------------:|
| ![pro](https://i.imgur.com/kI3m5c4.png) | ![qtts](https://i.imgur.com/TnizAQd.png) | ![qmldir](https://i.imgur.com/F6NH69h.png) |

|         Qt Markup Language (`*.qml`)        |          Qt Designer Form (`*.ui`)          | Qt Linguist Translation (`*.qt.ts`)         |
|:-------------------------------------------:|:-------------------------------------------:|---------------------------------------------|
| ![preview](https://i.imgur.com/fSwBIjL.png) | ![preview](https://i.imgur.com/1MMSV2b.png) | ![preview](https://i.imgur.com/Wjf2PkO.png) |

## Features

* [x] Qt Markup Language (`*.qml`) highlighting and snippets support
* [x] QML Module Definition Files (`*.qmldir`) highlighting and snippets support
* [x] Qt Style Sheets (`*.qss`) highlighting and snippets support
* [x] Qt Linguist Translation (`*.qt.ts`) highlighting support (XML)
* [x] Resource Collection Files (`*.qrc`) highlighting support (XML)
* [x] Qt Designer Form (`*.ui`) highlighting support (XML)
* [x] Qt Creator User Settings (`*.pro.user`) highlighting support (XML)
* [x] `qmake` highlighting support
* [x] New form (Qt Designer `*.ui` file) command
* [x] Edit form (Qt Designer `*.ui` file) command
* [x] Compile form (Qt Designer `*.ui` file) into Python file (require `pyuic5` or `pyside2-uic`)
* [x] Update translation (Qt Linguist `*.qt.ts` file) from Python file (require `pylupdate5` or `pyside2-lupdate`)
* [x] Edit translation (Qt Linguist `*.qt.ts` file)
* [x] Release translation (Qt Linguist `*.qt.ts` file) to `*.qm` file
* [x] Preview QML
* [x] Compile QRC (Qt Resource File) into Python file (require `pyrcc5` or `pyside2-rcc`)

## Supported Environment Variable

The following list shows the supported environment variable you can use for the path of Qt tools in configurations.

### Predefined Variables

* `${workspaceFolder}` - the path of the folder opened in VS Code
* `${workspaceFolderBasename}` - the name of the folder opened in VS Code without any slashes (/)
* `${file}` - the current opened file
* `${relativeFile}` - the current opened file relative to workspaceFolder
* `${fileBasename}` - the current opened file's basename
* `${fileBasenameNoExtension}` - the current opened file's basename without file extension
* `${fileDirname}` - the current opened file's dirname
* `${fileExtname}` - the current opened file's extension
* `${lineNumber}` - the current selected line number in the active file
* `${selectedText}` - the current selected text in the active file

> The example of predefined variables can be found [here](https://code.visualstudio.com/docs/editor/variables-reference).

### System Environment Variables

You can also reference environment variables through the `${env:Name}` syntax (for example, `${env:USER}`).

> Be sure to match the environment variable name's casing, for example `${env:Path}` on Windows.

## Requirements

This extension requires Qt Designer, Qt Linguist, Qt `lrelease` and Qt `qmlscene` for different features. You could install these tools by installing [Qt Creator](https://www.qt.io/download).

After the installation, you could find the tools within the installing folder of Qt Creator in your computer. For example, if you install Qt Creator 5.12.0 in `/opt/Qt` in Linux, you could find out the binary of these tools in `/opt/Qt/5.12.0/gcc_64/bin`. Or, for Windows, you could find the binary of the tools in `C:\Qt\5.12.0\mingw73_64\bin` if you did not change the default path. You have to set the paths of tools in **Qt for Python** section in user settings of Visual Studio Code before using the commands provided by this extension.

## Caveat

* All file generated by the following command would overwrite the existing files with the same name **without warning**.

## Release Notes

Please see the release notes in [CHANGELOG](CHANGELOG.md).
