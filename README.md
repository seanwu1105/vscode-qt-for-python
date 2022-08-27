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
- [x] Resolve predefined variables in tool paths
- [x] Configurations
  - [x] Enable/disable `qmllint` integration
  - [x] Set qmllint path
  - [x] Set qmllint args
  - [x] Support multi-root projects
    - [x] includes Python configuration
- [x] Ensure we use resource scope
  - [x] Support user-defined tool args
  - [x] Support user-defined tool paths
- [x] Build e2e tests (close #8)
- [ ] Languages features
  - [x] `qml`
  - [x] `qmldir`
  - [ ] `qss`
  - [x] `qrc`
  - [ ] `ui`
  - [ ] ~~`qt.ts`~~
  - [ ] ~~`pro.user`~~
  - [ ] ~~qmake `pro`~~
- [ ] Simple tools integration
  - [ ] pyside6-rcc
  - [ ] pyside6-uic
  - [ ] pyside6-designer
  - [ ] pyside6-project
  - [ ] i18n tools (optional)
- [ ] Continuous compilation
  - [ ] uic
  - [ ] rcc (optional)
  - [ ] i18n tools (optional)
- [ ] Support PyQt6
- [ ] Support PySide2
- [ ] Support PyQt5

[![build](https://github.com/seanwu1105/vscode-qt-for-python/workflows/build/badge.svg)](https://github.com/seanwu1105/vscode-qt-for-python/actions?query=workflow:build)
[![version](https://img.shields.io/visual-studio-marketplace/v/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![rating](https://img.shields.io/visual-studio-marketplace/r/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![downloads](https://img.shields.io/visual-studio-marketplace/d/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)
[![installs](https://img.shields.io/visual-studio-marketplace/i/seanwu.vscode-qt-for-python.svg)](https://marketplace.visualstudio.com/items?itemName=seanwu.vscode-qt-for-python)

TODO headline

TODO Preview

## Highlight Features

TODO

## Supported Environment Variables

The following list shows the supported environment variables you can use for the
path of Qt tools in configurations.

### Predefined Variables

TODO

> The example of predefined variables can be found
> [here](https://code.visualstudio.com/docs/editor/variables-reference).

### System Environment Variables

You can also reference environment variables through the `${env:Name}` syntax
(for example, `${env:USER}`).

> Be sure to match the environment variable name's casing, for example,
> `${env:Path}` on Windows.

## Requirements

TODO

## Release Notes

Please see the release notes in [CHANGELOG](CHANGELOG.md).

## Contributing

Please see how to contribute in [CONTRIBUTING](CONTRIBUTING.md).
