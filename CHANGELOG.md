# Change Log

## Unrelease

### Added

* `qmllint`
* `qmleasing`
* Color provider for QML and QSS
* `pyqtdeploy` (PyQt5 only)
* CI/CD

## 0.2.0

### Added

* Button for `qmlscene` preview
* Enable/disable configuration

## 0.1.0

### Added

* Python UI compiler (`pyuic5`, `pyside2-uic`)
* Python Resource Compiler (`pyrcc5`, `pyside2-rcc`)
* Python `lupdate` (`pylupdate5`, `pyside2-lupdate`)

### Changed

* Change the command IDs from `extension` to `qtForPython` to avoid confliction.

### Fixed

* Some command do not trigger the activation event of the extension.

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
