# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2021-??-??

- [x] Smart Python path.
- [x] Smart tools discover.
- [x] Auto UI compile.
- [x] Auto RCC compile.
- [x] Editor title icons.
- [ ] Support lupdate.
- [ ] Support lrelease.
- [ ] Support qml preview
- [ ] Support edit translate.
- [x] Support Linux.
- [ ] Support Windows.
- [x] Support PySide6.
- [ ] Support PyQt6.
- [ ] Support PySide2.
- [ ] Support PyQt5.
- [ ] Error dialog actions
  - [ ] Install PySide6/PyQt6/PySide2/PyQt5
  - [ ] Set paths in config

## 0.6.2 - 2021-04-15

### Updated

- Update license.

## 0.6.1 - 2021-02-13

### Fixed

- Fix the version of `engines.vscode` is different from `@types/vscode`.

## 0.6.0

### Added

- Add basic support for PySide6. Thanks to [pjx206](https://github.com/pjx206). #88

## 0.5.2

### Fixed

Fix release workflow by packaging VSIX file before upload it to release asset.

## 0.5.1

### Added

Add publisher property in `package.json` for CI/CD.

## 0.5.0

### Added

Add the syntax highlighting for `require` keyword in QML.

## 0.4.1

### Updated

Remove the new lines in QML snippets.

## 0.4.0

### Added

Support `.pri`, `.prf`, `.prl` file extensions by applying QMake syntax.

## 0.3.0

### Added

Partial environment variables are supported in configuration, including

- Visual Studio Code predefined variables
- Environment variables

## 0.2.0

### Added

Menus in editor/title and editor/context

### Fixed

- Now, the path of input file could include spaces. (thanks to _Paolo (ZioLupo)_)

## 0.1.1

### Changed

- Format the README.md
- Update the username of badgets

## 0.1.0

### Added

- Python UI compiler (`pyuic5`, `pyside2-uic`)
- Python Resource Compiler (`pyrcc5`, `pyside2-rcc`)
- Python `lupdate` (`pylupdate5`, `pyside2-lupdate`)

### Changed

- Change the command IDs from `extension` to `qtForPython` to avoid confliction.

### Fixed

- Some commands do not trigger the activation event of the extension.

## 0.0.2

### Added

- Badges on README and Visual Studio Code Extension Marketplace page.

## 0.0.1

### Added

- Qt Markup Language (`*.qml`) highlighting and snippets support
- QML Module Definition Files (`*.qmldir`) highlighting and snippets support
- Qt Style Sheets (`*.qss`) highlighting and snippets support
- Qt Linguist Translation (`*.qt.ts`) highlighting support (XML)
- Resource Collection Files (`*.qrc`) highlighting support (XML)
- Qt Designer Form (`*.ui`) highlighting support (XML)
- Qt Creator User Settings (`*.pro.user`) highlighting support (XML)
- `qmake` highlighting support
- New form (Qt Designer `*.ui` file) command
- Edit form (Qt Designer `*.ui` file) command
- Edit translation (Qt Linguist `*.qt.ts` file)
- Release translation (Qt Linguist `*.qt.ts` file) to `*.qm` file
- Preview QML
