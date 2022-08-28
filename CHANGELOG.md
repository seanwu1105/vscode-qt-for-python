# Change Log

All notable changes to the "vscode-qt-for-python" extension will be documented
in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how
to structure this file.

## [2.3.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v2.2.0...v2.3.0) (2022-08-28)


### Features

* **qss:** support QSS syntax highlighting ([7999e44](https://github.com/seanwu1105/vscode-qt-for-python/commit/7999e4446783066a9903246a43c56bad0f3a45de))
* support PyQt6, PySide2 and PyQt5 ([5d41b39](https://github.com/seanwu1105/vscode-qt-for-python/commit/5d41b390692114fa641bcf246bf18fe177741744))
* **uic:** add live execution support ([a757644](https://github.com/seanwu1105/vscode-qt-for-python/commit/a7576443e72d2761f292715d50bb08139e02f86b))

## [2.2.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v2.1.0...v2.2.0) (2022-08-28)


### Features

* **designer:** support Qt designer features ([50e46fe](https://github.com/seanwu1105/vscode-qt-for-python/commit/50e46fe7ce80eeedf8d5ce9d6a48a60210eeaf4d))
* **rcc:** add configurations for rcc path and options ([bb6e01a](https://github.com/seanwu1105/vscode-qt-for-python/commit/bb6e01ac637dd881a41bc01946344099e9d21554))
* **rcc:** add rcc command ([a3a611a](https://github.com/seanwu1105/vscode-qt-for-python/commit/a3a611ad49d44940ee8d8cdbadadf3325e01b23c))
* **rcc:** add rcc compile function ([338f4e2](https://github.com/seanwu1105/vscode-qt-for-python/commit/338f4e2319135832db8e77841bc177c0e1d834ae))
* support resource-related predefined variables ([98b6a37](https://github.com/seanwu1105/vscode-qt-for-python/commit/98b6a37efd64f4b20cc90a6d7424566d1c4fec00))
* **uic:** add uic support ([9c17e9d](https://github.com/seanwu1105/vscode-qt-for-python/commit/9c17e9db60497bfcb1ea03b90f9b24f41093bb2f))

## [2.1.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v2.0.0...v2.1.0) (2022-08-26)


### Features

* **qrc:** assign qrc file to xml language ([e252249](https://github.com/seanwu1105/vscode-qt-for-python/commit/e2522494e5d1215c72c4a851f23a9b249a49fd48))

## [2.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.7...v2.0.0) (2022-08-26)


### ⚠ BREAKING CHANGES

* Rebuild project to support more QML language features.

### Features

* build command execution wrapper ([55a2ed3](https://github.com/seanwu1105/vscode-qt-for-python/commit/55a2ed34c40296a7d1d89382f7643481c9b1fd0e))
* build qmllint ts wrapper ([db65cb7](https://github.com/seanwu1105/vscode-qt-for-python/commit/db65cb72c46faa3033250c4d6da3f48dacae48d1))
* **python:** add qmllint scripts ([1263928](https://github.com/seanwu1105/vscode-qt-for-python/commit/12639280b61e7d2d7cc1ba83e245b6840d9bb595))
* **qml:** add language features ([5140800](https://github.com/seanwu1105/vscode-qt-for-python/commit/51408001e908800c00ce9f68f66e511545ea29fe))
* **qmldir:** add language features ([b301e7b](https://github.com/seanwu1105/vscode-qt-for-python/commit/b301e7b18493ba59c4f52e49c3f73b6cd23d4c4b))
* **qmllint:** add enable/disable config ([ebb188f](https://github.com/seanwu1105/vscode-qt-for-python/commit/ebb188f8aa22a9bc8f9d9ff4d1716d04fb1d6096))
* **qmllint:** add qmllint path and options configurations ([e978688](https://github.com/seanwu1105/vscode-qt-for-python/commit/e978688671d79687b1b0c7220911b20c5e24623f))
* **qmllint:** catch uri-path conversion error ([4beef62](https://github.com/seanwu1105/vscode-qt-for-python/commit/4beef629e7969faa7da9825eaa87e35138576c06))
* **qmllint:** lint QML files on opened/saved ([a6bd8c6](https://github.com/seanwu1105/vscode-qt-for-python/commit/a6bd8c60c8db4953db2c9a0165e490d3e4ebc26c))
* **qmllint:** support .qmllint.ini file ([056478c](https://github.com/seanwu1105/vscode-qt-for-python/commit/056478cfa1ee66c2ca5ab7fa94f69168f4f17d34))
* **qmllint:** support multi-root workspace on resolving Python script ([13db906](https://github.com/seanwu1105/vscode-qt-for-python/commit/13db906f1ac9a1994594511e23bf2e70669b09d4))
* **qmllint:** support notification from server to client ([cc6798a](https://github.com/seanwu1105/vscode-qt-for-python/commit/cc6798af877d6f4850b62c250c79d7636d50c068))
* resolve predefined variables in tool path and options ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137)), closes [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184)
* show error notifications generated from Python scripts ([90a6a8f](https://github.com/seanwu1105/vscode-qt-for-python/commit/90a6a8f6011140670f5926040b1d6312e32891cb))
* show errors with notification window ([d060b76](https://github.com/seanwu1105/vscode-qt-for-python/commit/d060b763270c044a581273d14a57616da09191f9))
* show qmllint result ([a8a1161](https://github.com/seanwu1105/vscode-qt-for-python/commit/a8a1161d786b7cb81a0342baaf00e40ab7c36303))
* support spaces in command arguments ([9f3e9cb](https://github.com/seanwu1105/vscode-qt-for-python/commit/9f3e9cb194fbae56aca3df8fa38a3e8bc11f16c4))


### Bug Fixes

* [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184) ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137))
* [#237](https://github.com/seanwu1105/vscode-qt-for-python/issues/237) ([b182dc2](https://github.com/seanwu1105/vscode-qt-for-python/commit/b182dc2499d9442826ed3627e3faf4eb6ad8a9b9))
* ensure resolveScriptCommand returns an array of str ([82cd715](https://github.com/seanwu1105/vscode-qt-for-python/commit/82cd7159f2570d9e78032914310aa70a38ab9bbe))
* normalize path in tests ([d4ec8ff](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4ec8ffa12a9131b04e48322370c7177be6e5dd7))
* **python:** fix tests on Windows ([51dc24f](https://github.com/seanwu1105/vscode-qt-for-python/commit/51dc24fe37b2c17099ee66696ae4bb3fc46f1be0))
* **qmllint:** allow optional warning fields ([e00e384](https://github.com/seanwu1105/vscode-qt-for-python/commit/e00e3844e7b073ef7f76de4882105919a9f5f3f5))
* **qmllint:** ensure the server does not depend on vscode ([07e77b5](https://github.com/seanwu1105/vscode-qt-for-python/commit/07e77b554a4114e28a92a01c4529227be6281086))


### Reverts

* remove waitFor util ([05dda25](https://github.com/seanwu1105/vscode-qt-for-python/commit/05dda251d03343b16ce68cbe3e664bd5ba305a2e))


### Miscellaneous Chores

* reset project ([4c77f9b](https://github.com/seanwu1105/vscode-qt-for-python/commit/4c77f9b0d64e3c57234e690da051c9a13fde0e4a))

## [1.3.7](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.6...v1.3.7) (2022-07-30)

### Bug Fixes

- give up and use an external upload action
  ([9d2d3cf](https://github.com/seanwu1105/vscode-qt-for-python/commit/9d2d3cfa5af0c063a34a924087a3614f81e1bf65))

## [1.3.6](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.5...v1.3.6) (2022-07-30)

### Bug Fixes

- cat the target variable to curl
  ([526238d](https://github.com/seanwu1105/vscode-qt-for-python/commit/526238dbcebb03705c145d5a5547493d90ee7cd1))

## [1.3.5](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.4...v1.3.5) (2022-07-30)

### Bug Fixes

- destruct upload target
  ([3b34bbe](https://github.com/seanwu1105/vscode-qt-for-python/commit/3b34bbe64e2135bb18fc1efd1bffe3a8101290be))

## [1.3.4](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.3...v1.3.4) (2022-07-30)

### Bug Fixes

- wrap upload_url with quotes to escape brackets
  ([c32e345](https://github.com/seanwu1105/vscode-qt-for-python/commit/c32e345972305fc91baac79daa966ff0f2d20dd0))

## [1.3.3](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.2...v1.3.3) (2022-07-30)

### Bug Fixes

- debug release workflow
  ([2c6b104](https://github.com/seanwu1105/vscode-qt-for-python/commit/2c6b104664949a960eb3f7d93a7723b7a2b99fcf))

## [1.3.2](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.1...v1.3.2) (2022-07-30)

### Bug Fixes

- use parenthesis to concat URL
  ([94e74ab](https://github.com/seanwu1105/vscode-qt-for-python/commit/94e74ab1fd3392bc4dc6bd6e61dea2dddd2ae71d))

## [1.3.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.3.0...v1.3.1) (2022-07-30)

### Bug Fixes

- remove {?name,label} in upload_url
  ([85d667a](https://github.com/seanwu1105/vscode-qt-for-python/commit/85d667a7606d48d183ea679470c2dc3b22925c8b))

## [1.3.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v1.2.0...v1.3.0) (2022-07-28)

### Features

- upload VSIX to release assets (force release)
  ([39c32fa](https://github.com/seanwu1105/vscode-qt-for-python/commit/39c32fa7921fc795d348cf0d9ced128b067c5055))

### Bug Fixes

- fix wrong curl command
  ([30817f2](https://github.com/seanwu1105/vscode-qt-for-python/commit/30817f2e5de6466b4afd3278a48d55a163cf5123))

## [1.2.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/1.1.7...v1.2.0) (2022-07-28)

### Features

- update CI (use feat to try release PR)
  ([13d1518](https://github.com/seanwu1105/vscode-qt-for-python/commit/13d15182c5d75d29aafb6cd915bac8ddf44a429e))

### Reverts

- revert changelog header removal
  ([e907ffd](https://github.com/seanwu1105/vscode-qt-for-python/commit/e907ffd1d39729a71e47e005e5a1ad7e5f43878f))

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
