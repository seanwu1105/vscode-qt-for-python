## 1.1.7 - 2021-12-16

Republish the release to marketplace.

## 1.1.6 - 2021-12-16

### Fixed

- Fix incorrect syntax highlighting when adding new-line characters before a
  JavaScript code block. #165

## 1.1.5 - 2021-12-02

### Fixed

- Obtain Python interpreter path from ms-python extension. #151, #153

## 1.1.4 - 2021-06-10

### Fixed

- Clean up unnecessary files on bundling. #126 (thanks to
  [tjquillan](https://github.com/tjquillan))

## 1.1.3 - 2021-06-08

### Fixed

- Downgrade `vsce` to bundle Python scripts. #125

## 1.1.2 - 2021-06-04

### Fixed

- Apply JS highlighting after list property. This is just a workaround as the
  highlighting cannot be applied with multi-line expression. #116

## 1.1.1 - 2021-05-22

### Changed

- Enable `noUncheckedIndexedAccess` for null safety.

## 1.1.0 - 2021-05-22

### Added

- Highlight translation comments in QML.

## 1.0.2 - 2021-05-18

### Fixed

- Fix comment highlighting after `signal` or `import`. #114

## 1.0.1 - 2021-05-05

### Added

- Upload VSIX to artifacts on `build` workflow.

### Fixed

- Bundle `/python/scripts` with extension.
- Add `--yarn` option when package extension with `vsce`. See
  [this issue](https://github.com/microsoft/vscode-vsce/issues/439) for the
  workaround.

## 1.0.0 - 2021-05-03

### Added

- Get Python interpreter with `python.pythonPath` configuration.
- Discover Qt tools automatically from installed Qt for Python packages. #13
- Support re-compile UI files with `uic` on changed. #100
- Support re-compile RCC files with `rcc` on changed.
- Support re-update translation with `lupdate` on changed.
- Drop `lrelease` support as it is not included in any Qt for Python packages.
- Drop QML preview tool support as it is not included in any Qt for Python
  packages.
- Drop translation editor support as it is not included in any Qt for Python
  packages.
- Show error dialog on exception
- Handle `QtToolModuleNotFoundError`
  - Install PySide6 or PyQt6.
  - Set the missing tool path manually in configuration by selecting an
    executable.

### Changed

- Categorize configurations depending on each target tool.

### Fixed

- Fix `pyuic6` command with new path discovery mechanism. #95

## 0.6.2 - 2021-04-15

### Updated

- Update license.

## 0.6.1 - 2021-02-13

### Fixed

- Fix the version of `engines.vscode` is different from `@types/vscode`.

## 0.6.0

### Added

- Add basic support for PySide6. Thanks to [pjx206](https://github.com/pjx206).
  #88

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

- Now, the path of input file could include spaces. (thanks to _Paolo
  (ZioLupo)_)

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
