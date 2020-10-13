# Change Log

## 0.5.1

Add publisher property in `package.json` for CI/CD.

## 0.5.0

Add the syntax highlighting for `require` keyword in QML.

## 0.4.1

Remove the new lines in QML snippets.

## 0.4.0

### Added

Support `.pri`, `.prf`, `.prl` file extensions by applying QMake syntax.

## 0.3.0

### Added

Partial environment variables are supported in configuration, including

* Visual Studio Code predefined variables
* Environment variables

## 0.2.0

### Added

Menus in editor/title and editor/context

### Fixed

* Now, the path of input file could include spaces. (thanks to _Paolo (ZioLupo)_)

## 0.1.1

### Changed

* Format the README.md
* Update the username of badgets

## 0.1.0

### Added

* Python UI compiler (`pyuic5`, `pyside2-uic`)
* Python Resource Compiler (`pyrcc5`, `pyside2-rcc`)
* Python `lupdate` (`pylupdate5`, `pyside2-lupdate`)

### Changed

* Change the command IDs from `extension` to `qtForPython` to avoid confliction.

### Fixed

* Some commands do not trigger the activation event of the extension.

## 0.0.2

### Added

* Badges on README and Visual Studio Code Extension Marketplace page.

## 0.0.1

### Added

* Qt Markup Language (`*.qml`) highlighting and snippets support
* QML Module Definition Files (`*.qmldir`) highlighting and snippets support
* Qt Style Sheets (`*.qss`) highlighting and snippets support
* Qt Linguist Translation (`*.qt.ts`) highlighting support (XML)
* Resource Collection Files (`*.qrc`) highlighting support (XML)
* Qt Designer Form (`*.ui`) highlighting support (XML)
* Qt Creator User Settings (`*.pro.user`) highlighting support (XML)
* `qmake` highlighting support
* New form (Qt Designer `*.ui` file) command
* Edit form (Qt Designer `*.ui` file) command
* Edit translation (Qt Linguist `*.qt.ts` file)
* Release translation (Qt Linguist `*.qt.ts` file) to `*.qm` file
* Preview QML
