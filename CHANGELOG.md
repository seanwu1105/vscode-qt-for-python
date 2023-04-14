# Change Log

All notable changes to the "vscode-qt-for-python" extension will be documented
in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how
to structure this file.

## [7.3.2](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.3.1...v7.3.2) (2023-04-14)


### Bug Fixes

* typo ([#302](https://github.com/seanwu1105/vscode-qt-for-python/issues/302)) ([31f9316](https://github.com/seanwu1105/vscode-qt-for-python/commit/31f9316db410d50558e345fc56b0dbb9baeb4ccb))

## [7.3.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.3.0...v7.3.1) (2023-04-07)


### Bug Fixes

* remove typing_extensions dependencies ([e694a55](https://github.com/seanwu1105/vscode-qt-for-python/commit/e694a55e6ad0a7dfa65a53de6f7455f73217f0d4)), closes [#299](https://github.com/seanwu1105/vscode-qt-for-python/issues/299)

## [7.3.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.2.2...v7.3.0) (2023-04-06)


### Features

* support Python 3.7+ ([e8429d7](https://github.com/seanwu1105/vscode-qt-for-python/commit/e8429d760a3b9d98a55d3a591a5a067c354b67d5)), closes [#292](https://github.com/seanwu1105/vscode-qt-for-python/issues/292)


### Bug Fixes

* change default rcc and uic output file names to *_rc and *_ui ([1027ca5](https://github.com/seanwu1105/vscode-qt-for-python/commit/1027ca5e30702590188e8405a983b202bfe9ca51)), closes [#289](https://github.com/seanwu1105/vscode-qt-for-python/issues/289)
* parse qrc files with multiple qresource elements ([289e02b](https://github.com/seanwu1105/vscode-qt-for-python/commit/289e02bfd65b36e4610812a4fe72da130f669533))

## [7.2.2](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.2.1...v7.2.2) (2023-03-06)


### Bug Fixes

* disable qrc file watcher when rcc.liveExecution.enabled = false ([884cef4](https://github.com/seanwu1105/vscode-qt-for-python/commit/884cef42c1769b16101cf0207000dea25bc54977)), closes [#286](https://github.com/seanwu1105/vscode-qt-for-python/issues/286)

## [7.2.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.2.0...v7.2.1) (2023-03-05)


### Bug Fixes

* restart qmlls client if the configurations are changed ([b822c4e](https://github.com/seanwu1105/vscode-qt-for-python/commit/b822c4efb1c0caefb15cd417144f604d58285eee))

## [7.2.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.1.1...v7.2.0) (2023-03-04)


### Features

* add linguist support ([ba9e29f](https://github.com/seanwu1105/vscode-qt-for-python/commit/ba9e29f45c88d13c8f2cb087b9aaf12680ef8579)), closes [#282](https://github.com/seanwu1105/vscode-qt-for-python/issues/282)
* add lrelease support ([50a9faa](https://github.com/seanwu1105/vscode-qt-for-python/commit/50a9faa3b2d54d6d0004e647b53b788f3c65ffc9)), closes [#282](https://github.com/seanwu1105/vscode-qt-for-python/issues/282)
* add lupdate support ([8b6829e](https://github.com/seanwu1105/vscode-qt-for-python/commit/8b6829ed8011d169fa008133751a80cadf08632f)), closes [#282](https://github.com/seanwu1105/vscode-qt-for-python/issues/282)


### Bug Fixes

* show lupdate command on UI files ([b1aec1e](https://github.com/seanwu1105/vscode-qt-for-python/commit/b1aec1e34ce7463bf9952a1b09ac6d6fdce8f9b0))

## [7.1.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.1.0...v7.1.1) (2023-03-01)


### Bug Fixes

* activate extension if containing qrc files ([a4cb526](https://github.com/seanwu1105/vscode-qt-for-python/commit/a4cb52697ef3ed7155e311915ed74e7b28fd7618))

## [7.1.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v7.0.0...v7.1.0) (2023-02-28)


### Features

* support pyside6-qml to preview QML files ([736dcdf](https://github.com/seanwu1105/vscode-qt-for-python/commit/736dcdf74afd32ec7ae515e5f8b22f389d1447d3))

## [7.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.3.0...v7.0.0) (2023-02-25)


### ⚠ BREAKING CHANGES

* replace config rcc|uic.liveExecution with rcc|uic.liveExecution.enabled

### Features

* allow users to set glob pattern for live execution ([90ac3f0](https://github.com/seanwu1105/vscode-qt-for-python/commit/90ac3f0c0aadd141f93d91dc197d0bdc6e1bc7d3)), closes [#278](https://github.com/seanwu1105/vscode-qt-for-python/issues/278)

## [6.3.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.2.2...v6.3.0) (2023-02-16)


### Features

* improve logging messages ([ea2a893](https://github.com/seanwu1105/vscode-qt-for-python/commit/ea2a89358ace7819df92b4aee4621e4d9197dadc))

## [6.2.2](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.2.1...v6.2.2) (2023-02-16)


### Bug Fixes

* await command result ([831280c](https://github.com/seanwu1105/vscode-qt-for-python/commit/831280c2b545ec642611a7c524eaf1d88d68616b)), closes [#275](https://github.com/seanwu1105/vscode-qt-for-python/issues/275)

## [6.2.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.2.0...v6.2.1) (2023-02-15)


### Bug Fixes

* highlight the ID selector in QSS without depending on ending spaces ([f0a56a9](https://github.com/seanwu1105/vscode-qt-for-python/commit/f0a56a97d10f58ab7b4b6e2ab6ce34ca4c9d521d)), closes [#273](https://github.com/seanwu1105/vscode-qt-for-python/issues/273)

## [6.2.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.1.0...v6.2.0) (2023-02-13)


### Features

* add configuration to enable/disable RCC live execution ([99f3f79](https://github.com/seanwu1105/vscode-qt-for-python/commit/99f3f79ea4b7f6c926990fe17662eab55d658800))
* add live execution for QRC files ([003e28d](https://github.com/seanwu1105/vscode-qt-for-python/commit/003e28dbae82eb502ddfc9ed647273e8cbbac058)), closes [#249](https://github.com/seanwu1105/vscode-qt-for-python/issues/249)
* catch errors at the end of all observable pipes ([24c4647](https://github.com/seanwu1105/vscode-qt-for-python/commit/24c4647d7d0d306f6b26f0bf9a5849654ca775a4))

## [6.1.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v6.0.0...v6.1.0) (2023-02-11)


### Features

* check if the environment has qmlls before establish language ([89ab7a7](https://github.com/seanwu1105/vscode-qt-for-python/commit/89ab7a7d4bc3b7c2ad4adf4c38a296a1f0e7f231)), closes [#266](https://github.com/seanwu1105/vscode-qt-for-python/issues/266)

## [6.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v5.0.0...v6.0.0) (2023-02-11)


### ⚠ BREAKING CHANGES

* remove pre-release branch
* force release bot bump
* drop qmllint support as it's superseded by qmlls
* drop qmllint 6.3.2 support
* bump official release a major version
* Rebuild project to support more QML language features.

### Features

* build command execution wrapper ([55a2ed3](https://github.com/seanwu1105/vscode-qt-for-python/commit/55a2ed34c40296a7d1d89382f7643481c9b1fd0e))
* build qmllint ts wrapper ([db65cb7](https://github.com/seanwu1105/vscode-qt-for-python/commit/db65cb72c46faa3033250c4d6da3f48dacae48d1))
* **designer:** support Qt designer features ([50e46fe](https://github.com/seanwu1105/vscode-qt-for-python/commit/50e46fe7ce80eeedf8d5ce9d6a48a60210eeaf4d))
* drop qmllint 6.3.2 support ([d4d3343](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4d33431f8ef241e559d725d422808c270fba71a))
* drop qmllint support as it's superseded by qmlls ([01bbbaf](https://github.com/seanwu1105/vscode-qt-for-python/commit/01bbbaf7b16a5d23fa415117568d47a340bbb47b))
* provide quick fix with suggestions field from qmllint ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef)), closes [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248)
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
* **qrc:** assign qrc file to xml language ([e252249](https://github.com/seanwu1105/vscode-qt-for-python/commit/e2522494e5d1215c72c4a851f23a9b249a49fd48))
* **qss:** support QSS syntax highlighting ([7999e44](https://github.com/seanwu1105/vscode-qt-for-python/commit/7999e4446783066a9903246a43c56bad0f3a45de))
* **rcc:** add configurations for rcc path and options ([bb6e01a](https://github.com/seanwu1105/vscode-qt-for-python/commit/bb6e01ac637dd881a41bc01946344099e9d21554))
* **rcc:** add rcc command ([a3a611a](https://github.com/seanwu1105/vscode-qt-for-python/commit/a3a611ad49d44940ee8d8cdbadadf3325e01b23c))
* **rcc:** add rcc compile function ([338f4e2](https://github.com/seanwu1105/vscode-qt-for-python/commit/338f4e2319135832db8e77841bc177c0e1d834ae))
* resolve predefined variables in tool path and options ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137)), closes [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184)
* show error notifications generated from Python scripts ([90a6a8f](https://github.com/seanwu1105/vscode-qt-for-python/commit/90a6a8f6011140670f5926040b1d6312e32891cb))
* show errors with notification window ([d060b76](https://github.com/seanwu1105/vscode-qt-for-python/commit/d060b763270c044a581273d14a57616da09191f9))
* show qmllint result ([a8a1161](https://github.com/seanwu1105/vscode-qt-for-python/commit/a8a1161d786b7cb81a0342baaf00e40ab7c36303))
* support agb and agba color widget ([14c3f96](https://github.com/seanwu1105/vscode-qt-for-python/commit/14c3f96aad987e26d8ccea0c30866eb51b5bbb2d)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support HEX color widget ([76faae2](https://github.com/seanwu1105/vscode-qt-for-python/commit/76faae208d5a6daebd852cc5b3e5df49c2d71181)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsl and hsla color widget ([6411f26](https://github.com/seanwu1105/vscode-qt-for-python/commit/6411f264e250753be2cc8e2314e7e18af8a39840)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsv and hsva color widget ([13e6d79](https://github.com/seanwu1105/vscode-qt-for-python/commit/13e6d797cdd877e477579bc049a83bde14f3fbc7)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support PyQt6, PySide2 and PyQt5 ([5d41b39](https://github.com/seanwu1105/vscode-qt-for-python/commit/5d41b390692114fa641bcf246bf18fe177741744))
* support qmlls ([0617762](https://github.com/seanwu1105/vscode-qt-for-python/commit/061776217ced03fcaff5243aa821efe39ac0fed5))
* support qmlls with e2e tests for configuration changes ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f)), closes [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251)
* support resource-related predefined variables ([98b6a37](https://github.com/seanwu1105/vscode-qt-for-python/commit/98b6a37efd64f4b20cc90a6d7424566d1c4fec00))
* support spaces in command arguments ([9f3e9cb](https://github.com/seanwu1105/vscode-qt-for-python/commit/9f3e9cb194fbae56aca3df8fa38a3e8bc11f16c4))
* **uic:** add live execution support ([a757644](https://github.com/seanwu1105/vscode-qt-for-python/commit/a7576443e72d2761f292715d50bb08139e02f86b))
* **uic:** add uic support ([9c17e9d](https://github.com/seanwu1105/vscode-qt-for-python/commit/9c17e9db60497bfcb1ea03b90f9b24f41093bb2f))
* update CI (use feat to try release PR) ([13d1518](https://github.com/seanwu1105/vscode-qt-for-python/commit/13d15182c5d75d29aafb6cd915bac8ddf44a429e))
* upload VSIX to release assets (force release) ([39c32fa](https://github.com/seanwu1105/vscode-qt-for-python/commit/39c32fa7921fc795d348cf0d9ced128b067c5055))
* use zod to validate qmllint result ([67ea036](https://github.com/seanwu1105/vscode-qt-for-python/commit/67ea036d188c63e7593074410c13235bcc79c4c1))


### Bug Fixes

* [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184) ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137))
* [#237](https://github.com/seanwu1105/vscode-qt-for-python/issues/237) ([b182dc2](https://github.com/seanwu1105/vscode-qt-for-python/commit/b182dc2499d9442826ed3627e3faf4eb6ad8a9b9))
* [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248) ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef))
* [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251) ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f))
* [#260](https://github.com/seanwu1105/vscode-qt-for-python/issues/260) ([e9681e8](https://github.com/seanwu1105/vscode-qt-for-python/commit/e9681e847da37b3d8fc1224eb7a6d2616486af34))
* 165. ([0a865bf](https://github.com/seanwu1105/vscode-qt-for-python/commit/0a865bfdcdb3afd286a1cf65f4de15c6d483aaac))
* bundle dependencies into release ([35ea0d9](https://github.com/seanwu1105/vscode-qt-for-python/commit/35ea0d90ef1885993fe7efc777f4e763e6f23944))
* cat the target variable to curl ([526238d](https://github.com/seanwu1105/vscode-qt-for-python/commit/526238dbcebb03705c145d5a5547493d90ee7cd1))
* debug release workflow ([2c6b104](https://github.com/seanwu1105/vscode-qt-for-python/commit/2c6b104664949a960eb3f7d93a7723b7a2b99fcf))
* destruct upload target ([3b34bbe](https://github.com/seanwu1105/vscode-qt-for-python/commit/3b34bbe64e2135bb18fc1efd1bffe3a8101290be))
* ensure resolveScriptCommand returns an array of str ([82cd715](https://github.com/seanwu1105/vscode-qt-for-python/commit/82cd7159f2570d9e78032914310aa70a38ab9bbe))
* ensure the observable does not complete before the language client disposed ([8ded538](https://github.com/seanwu1105/vscode-qt-for-python/commit/8ded5384728c7160a065fd5170dc0a0332db912d))
* fix wrong curl command ([30817f2](https://github.com/seanwu1105/vscode-qt-for-python/commit/30817f2e5de6466b4afd3278a48d55a163cf5123))
* force release bot to dump version ([7f134c8](https://github.com/seanwu1105/vscode-qt-for-python/commit/7f134c852d89d21bdecbcc1f66870e73e5dc1f7c))
* give up and use an external upload action ([9d2d3cf](https://github.com/seanwu1105/vscode-qt-for-python/commit/9d2d3cfa5af0c063a34a924087a3614f81e1bf65))
* normalize path in tests ([d4ec8ff](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4ec8ffa12a9131b04e48322370c7177be6e5dd7))
* **python:** fix tests on Windows ([51dc24f](https://github.com/seanwu1105/vscode-qt-for-python/commit/51dc24fe37b2c17099ee66696ae4bb3fc46f1be0))
* **qmllint:** allow optional warning fields ([e00e384](https://github.com/seanwu1105/vscode-qt-for-python/commit/e00e3844e7b073ef7f76de4882105919a9f5f3f5))
* **qmllint:** ensure the server does not depend on vscode ([07e77b5](https://github.com/seanwu1105/vscode-qt-for-python/commit/07e77b554a4114e28a92a01c4529227be6281086))
* remove {?name,label} in upload_url ([85d667a](https://github.com/seanwu1105/vscode-qt-for-python/commit/85d667a7606d48d183ea679470c2dc3b22925c8b))
* support qmllint with PySide 6.4.1 ([dc2f427](https://github.com/seanwu1105/vscode-qt-for-python/commit/dc2f42716a0793e34b0386316880c72527b93f9d)), closes [#255](https://github.com/seanwu1105/vscode-qt-for-python/issues/255)
* the path of input file in command could include spaces ([bec856b](https://github.com/seanwu1105/vscode-qt-for-python/commit/bec856b77195827ee7819868d9bc4b00296b3103))
* use parenthesis to concat URL ([94e74ab](https://github.com/seanwu1105/vscode-qt-for-python/commit/94e74ab1fd3392bc4dc6bd6e61dea2dddd2ae71d))
* VSCE package errors. ([e567d18](https://github.com/seanwu1105/vscode-qt-for-python/commit/e567d1822e8ad3bfe09595b88b2d252689aa5a5d))
* watching uic config for rcc. ([8da7769](https://github.com/seanwu1105/vscode-qt-for-python/commit/8da7769462d837dfaf67f9f5eb853b1abfd8b24f))
* wrap upload_url with quotes to escape brackets ([c32e345](https://github.com/seanwu1105/vscode-qt-for-python/commit/c32e345972305fc91baac79daa966ff0f2d20dd0))


### Reverts

* remove waitFor util ([05dda25](https://github.com/seanwu1105/vscode-qt-for-python/commit/05dda251d03343b16ce68cbe3e664bd5ba305a2e))
* revert changelog header removal ([e907ffd](https://github.com/seanwu1105/vscode-qt-for-python/commit/e907ffd1d39729a71e47e005e5a1ad7e5f43878f))


### Documentation

* force release bot bump ([033b849](https://github.com/seanwu1105/vscode-qt-for-python/commit/033b849a637f99fb91304f854674558fb6e63dc6))


### Miscellaneous Chores

* bump official release a major version ([10136a0](https://github.com/seanwu1105/vscode-qt-for-python/commit/10136a061fab33a91dd8d2d9766bc0c226255572))
* remove pre-release branch ([c121d83](https://github.com/seanwu1105/vscode-qt-for-python/commit/c121d83d6d45d049da30c379271fb967257f95cf))
* reset project ([4c77f9b](https://github.com/seanwu1105/vscode-qt-for-python/commit/4c77f9b0d64e3c57234e690da051c9a13fde0e4a))

## [5.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v4.0.0...v5.0.0) (2023-02-10)


### ⚠ BREAKING CHANGES

* force release bot bump
* drop qmllint support as it's superseded by qmlls
* drop qmllint 6.3.2 support
* bump official release a major version
* Rebuild project to support more QML language features.

### Features

* build command execution wrapper ([55a2ed3](https://github.com/seanwu1105/vscode-qt-for-python/commit/55a2ed34c40296a7d1d89382f7643481c9b1fd0e))
* build qmllint ts wrapper ([db65cb7](https://github.com/seanwu1105/vscode-qt-for-python/commit/db65cb72c46faa3033250c4d6da3f48dacae48d1))
* **designer:** support Qt designer features ([50e46fe](https://github.com/seanwu1105/vscode-qt-for-python/commit/50e46fe7ce80eeedf8d5ce9d6a48a60210eeaf4d))
* drop qmllint 6.3.2 support ([d4d3343](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4d33431f8ef241e559d725d422808c270fba71a))
* drop qmllint support as it's superseded by qmlls ([01bbbaf](https://github.com/seanwu1105/vscode-qt-for-python/commit/01bbbaf7b16a5d23fa415117568d47a340bbb47b))
* provide quick fix with suggestions field from qmllint ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef)), closes [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248)
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
* **qrc:** assign qrc file to xml language ([e252249](https://github.com/seanwu1105/vscode-qt-for-python/commit/e2522494e5d1215c72c4a851f23a9b249a49fd48))
* **qss:** support QSS syntax highlighting ([7999e44](https://github.com/seanwu1105/vscode-qt-for-python/commit/7999e4446783066a9903246a43c56bad0f3a45de))
* **rcc:** add configurations for rcc path and options ([bb6e01a](https://github.com/seanwu1105/vscode-qt-for-python/commit/bb6e01ac637dd881a41bc01946344099e9d21554))
* **rcc:** add rcc command ([a3a611a](https://github.com/seanwu1105/vscode-qt-for-python/commit/a3a611ad49d44940ee8d8cdbadadf3325e01b23c))
* **rcc:** add rcc compile function ([338f4e2](https://github.com/seanwu1105/vscode-qt-for-python/commit/338f4e2319135832db8e77841bc177c0e1d834ae))
* resolve predefined variables in tool path and options ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137)), closes [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184)
* show error notifications generated from Python scripts ([90a6a8f](https://github.com/seanwu1105/vscode-qt-for-python/commit/90a6a8f6011140670f5926040b1d6312e32891cb))
* show errors with notification window ([d060b76](https://github.com/seanwu1105/vscode-qt-for-python/commit/d060b763270c044a581273d14a57616da09191f9))
* show qmllint result ([a8a1161](https://github.com/seanwu1105/vscode-qt-for-python/commit/a8a1161d786b7cb81a0342baaf00e40ab7c36303))
* support agb and agba color widget ([14c3f96](https://github.com/seanwu1105/vscode-qt-for-python/commit/14c3f96aad987e26d8ccea0c30866eb51b5bbb2d)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support HEX color widget ([76faae2](https://github.com/seanwu1105/vscode-qt-for-python/commit/76faae208d5a6daebd852cc5b3e5df49c2d71181)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsl and hsla color widget ([6411f26](https://github.com/seanwu1105/vscode-qt-for-python/commit/6411f264e250753be2cc8e2314e7e18af8a39840)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsv and hsva color widget ([13e6d79](https://github.com/seanwu1105/vscode-qt-for-python/commit/13e6d797cdd877e477579bc049a83bde14f3fbc7)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support PyQt6, PySide2 and PyQt5 ([5d41b39](https://github.com/seanwu1105/vscode-qt-for-python/commit/5d41b390692114fa641bcf246bf18fe177741744))
* support qmlls ([0617762](https://github.com/seanwu1105/vscode-qt-for-python/commit/061776217ced03fcaff5243aa821efe39ac0fed5))
* support qmlls with e2e tests for configuration changes ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f)), closes [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251)
* support resource-related predefined variables ([98b6a37](https://github.com/seanwu1105/vscode-qt-for-python/commit/98b6a37efd64f4b20cc90a6d7424566d1c4fec00))
* support spaces in command arguments ([9f3e9cb](https://github.com/seanwu1105/vscode-qt-for-python/commit/9f3e9cb194fbae56aca3df8fa38a3e8bc11f16c4))
* **uic:** add live execution support ([a757644](https://github.com/seanwu1105/vscode-qt-for-python/commit/a7576443e72d2761f292715d50bb08139e02f86b))
* **uic:** add uic support ([9c17e9d](https://github.com/seanwu1105/vscode-qt-for-python/commit/9c17e9db60497bfcb1ea03b90f9b24f41093bb2f))
* update CI (use feat to try release PR) ([13d1518](https://github.com/seanwu1105/vscode-qt-for-python/commit/13d15182c5d75d29aafb6cd915bac8ddf44a429e))
* upload VSIX to release assets (force release) ([39c32fa](https://github.com/seanwu1105/vscode-qt-for-python/commit/39c32fa7921fc795d348cf0d9ced128b067c5055))
* use zod to validate qmllint result ([67ea036](https://github.com/seanwu1105/vscode-qt-for-python/commit/67ea036d188c63e7593074410c13235bcc79c4c1))


### Bug Fixes

* [#184](https://github.com/seanwu1105/vscode-qt-for-python/issues/184) ([f139415](https://github.com/seanwu1105/vscode-qt-for-python/commit/f139415348414e72de78ca75f9178be5be602137))
* [#237](https://github.com/seanwu1105/vscode-qt-for-python/issues/237) ([b182dc2](https://github.com/seanwu1105/vscode-qt-for-python/commit/b182dc2499d9442826ed3627e3faf4eb6ad8a9b9))
* [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248) ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef))
* [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251) ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f))
* [#260](https://github.com/seanwu1105/vscode-qt-for-python/issues/260) ([e9681e8](https://github.com/seanwu1105/vscode-qt-for-python/commit/e9681e847da37b3d8fc1224eb7a6d2616486af34))
* 165. ([0a865bf](https://github.com/seanwu1105/vscode-qt-for-python/commit/0a865bfdcdb3afd286a1cf65f4de15c6d483aaac))
* bundle dependencies into release ([35ea0d9](https://github.com/seanwu1105/vscode-qt-for-python/commit/35ea0d90ef1885993fe7efc777f4e763e6f23944))
* cat the target variable to curl ([526238d](https://github.com/seanwu1105/vscode-qt-for-python/commit/526238dbcebb03705c145d5a5547493d90ee7cd1))
* debug release workflow ([2c6b104](https://github.com/seanwu1105/vscode-qt-for-python/commit/2c6b104664949a960eb3f7d93a7723b7a2b99fcf))
* destruct upload target ([3b34bbe](https://github.com/seanwu1105/vscode-qt-for-python/commit/3b34bbe64e2135bb18fc1efd1bffe3a8101290be))
* ensure resolveScriptCommand returns an array of str ([82cd715](https://github.com/seanwu1105/vscode-qt-for-python/commit/82cd7159f2570d9e78032914310aa70a38ab9bbe))
* ensure the observable does not complete before the language client disposed ([8ded538](https://github.com/seanwu1105/vscode-qt-for-python/commit/8ded5384728c7160a065fd5170dc0a0332db912d))
* fix wrong curl command ([30817f2](https://github.com/seanwu1105/vscode-qt-for-python/commit/30817f2e5de6466b4afd3278a48d55a163cf5123))
* force release bot to dump version ([7f134c8](https://github.com/seanwu1105/vscode-qt-for-python/commit/7f134c852d89d21bdecbcc1f66870e73e5dc1f7c))
* give up and use an external upload action ([9d2d3cf](https://github.com/seanwu1105/vscode-qt-for-python/commit/9d2d3cfa5af0c063a34a924087a3614f81e1bf65))
* normalize path in tests ([d4ec8ff](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4ec8ffa12a9131b04e48322370c7177be6e5dd7))
* **python:** fix tests on Windows ([51dc24f](https://github.com/seanwu1105/vscode-qt-for-python/commit/51dc24fe37b2c17099ee66696ae4bb3fc46f1be0))
* **qmllint:** allow optional warning fields ([e00e384](https://github.com/seanwu1105/vscode-qt-for-python/commit/e00e3844e7b073ef7f76de4882105919a9f5f3f5))
* **qmllint:** ensure the server does not depend on vscode ([07e77b5](https://github.com/seanwu1105/vscode-qt-for-python/commit/07e77b554a4114e28a92a01c4529227be6281086))
* remove {?name,label} in upload_url ([85d667a](https://github.com/seanwu1105/vscode-qt-for-python/commit/85d667a7606d48d183ea679470c2dc3b22925c8b))
* support qmllint with PySide 6.4.1 ([dc2f427](https://github.com/seanwu1105/vscode-qt-for-python/commit/dc2f42716a0793e34b0386316880c72527b93f9d)), closes [#255](https://github.com/seanwu1105/vscode-qt-for-python/issues/255)
* the path of input file in command could include spaces ([bec856b](https://github.com/seanwu1105/vscode-qt-for-python/commit/bec856b77195827ee7819868d9bc4b00296b3103))
* use parenthesis to concat URL ([94e74ab](https://github.com/seanwu1105/vscode-qt-for-python/commit/94e74ab1fd3392bc4dc6bd6e61dea2dddd2ae71d))
* VSCE package errors. ([e567d18](https://github.com/seanwu1105/vscode-qt-for-python/commit/e567d1822e8ad3bfe09595b88b2d252689aa5a5d))
* watching uic config for rcc. ([8da7769](https://github.com/seanwu1105/vscode-qt-for-python/commit/8da7769462d837dfaf67f9f5eb853b1abfd8b24f))
* wrap upload_url with quotes to escape brackets ([c32e345](https://github.com/seanwu1105/vscode-qt-for-python/commit/c32e345972305fc91baac79daa966ff0f2d20dd0))


### Reverts

* remove waitFor util ([05dda25](https://github.com/seanwu1105/vscode-qt-for-python/commit/05dda251d03343b16ce68cbe3e664bd5ba305a2e))
* revert changelog header removal ([e907ffd](https://github.com/seanwu1105/vscode-qt-for-python/commit/e907ffd1d39729a71e47e005e5a1ad7e5f43878f))


### Miscellaneous Chores

* bump official release a major version ([10136a0](https://github.com/seanwu1105/vscode-qt-for-python/commit/10136a061fab33a91dd8d2d9766bc0c226255572))
* reset project ([4c77f9b](https://github.com/seanwu1105/vscode-qt-for-python/commit/4c77f9b0d64e3c57234e690da051c9a13fde0e4a))


### Documentation

* force release bot bump ([033b849](https://github.com/seanwu1105/vscode-qt-for-python/commit/033b849a637f99fb91304f854674558fb6e63dc6))

## [4.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v3.0.2...v4.0.0) (2023-02-10)


### ⚠ BREAKING CHANGES

* drop qmllint support as it's superseded by qmlls
* drop qmllint 6.3.2 support

### Features

* drop qmllint 6.3.2 support ([d4d3343](https://github.com/seanwu1105/vscode-qt-for-python/commit/d4d33431f8ef241e559d725d422808c270fba71a))
* drop qmllint support as it's superseded by qmlls ([01bbbaf](https://github.com/seanwu1105/vscode-qt-for-python/commit/01bbbaf7b16a5d23fa415117568d47a340bbb47b))
* provide quick fix with suggestions field from qmllint ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef)), closes [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248)
* support agb and agba color widget ([14c3f96](https://github.com/seanwu1105/vscode-qt-for-python/commit/14c3f96aad987e26d8ccea0c30866eb51b5bbb2d)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support HEX color widget ([76faae2](https://github.com/seanwu1105/vscode-qt-for-python/commit/76faae208d5a6daebd852cc5b3e5df49c2d71181)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsl and hsla color widget ([6411f26](https://github.com/seanwu1105/vscode-qt-for-python/commit/6411f264e250753be2cc8e2314e7e18af8a39840)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support hsv and hsva color widget ([13e6d79](https://github.com/seanwu1105/vscode-qt-for-python/commit/13e6d797cdd877e477579bc049a83bde14f3fbc7)), closes [#137](https://github.com/seanwu1105/vscode-qt-for-python/issues/137)
* support qmlls ([0617762](https://github.com/seanwu1105/vscode-qt-for-python/commit/061776217ced03fcaff5243aa821efe39ac0fed5))
* support qmlls with e2e tests for configuration changes ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f)), closes [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251)
* use zod to validate qmllint result ([67ea036](https://github.com/seanwu1105/vscode-qt-for-python/commit/67ea036d188c63e7593074410c13235bcc79c4c1))


### Bug Fixes

* [#248](https://github.com/seanwu1105/vscode-qt-for-python/issues/248) ([a148ea7](https://github.com/seanwu1105/vscode-qt-for-python/commit/a148ea7714ca5f80dcafe695ef816bcf9b52deef))
* [#251](https://github.com/seanwu1105/vscode-qt-for-python/issues/251) ([87b49e1](https://github.com/seanwu1105/vscode-qt-for-python/commit/87b49e14779f8e5315b8c4fb235bde0b4db9f02f))
* [#260](https://github.com/seanwu1105/vscode-qt-for-python/issues/260) ([e9681e8](https://github.com/seanwu1105/vscode-qt-for-python/commit/e9681e847da37b3d8fc1224eb7a6d2616486af34))
* ensure the observable does not complete before the language client disposed ([8ded538](https://github.com/seanwu1105/vscode-qt-for-python/commit/8ded5384728c7160a065fd5170dc0a0332db912d))
* force release bot to dump version ([7f134c8](https://github.com/seanwu1105/vscode-qt-for-python/commit/7f134c852d89d21bdecbcc1f66870e73e5dc1f7c))

## [3.0.2](https://github.com/seanwu1105/vscode-qt-for-python/compare/v3.0.1...v3.0.2) (2022-11-29)

### Bug Fixes

* support qmllint with PySide 6.4.1 ([dc2f427](https://github.com/seanwu1105/vscode-qt-for-python/commit/dc2f42716a0793e34b0386316880c72527b93f9d)), closes [#255](https://github.com/seanwu1105/vscode-qt-for-python/issues/255)

## [3.0.1](https://github.com/seanwu1105/vscode-qt-for-python/compare/v3.0.0...v3.0.1) (2022-08-29)


### Bug Fixes

* bundle dependencies into release ([35ea0d9](https://github.com/seanwu1105/vscode-qt-for-python/commit/35ea0d90ef1885993fe7efc777f4e763e6f23944))

## [3.0.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v2.3.0...v3.0.0) (2022-08-28)


### ⚠ BREAKING CHANGES

* bump official release a major version

### Miscellaneous Chores

* bump official release a major version ([10136a0](https://github.com/seanwu1105/vscode-qt-for-python/commit/10136a061fab33a91dd8d2d9766bc0c226255572))

## [2.3.0](https://github.com/seanwu1105/vscode-qt-for-python/compare/v2.2.0...v2.3.0) (2022-08-28)

### ⚠ BREAKING CHANGES

- Drop support for Qt i18n tools, such as `lupdate`, `lrelease`, as they are not
  used frequently
  - Use other Python i18n frameworks instead, such as [`python-i18n`](https://github.com/danhper/python-i18n)
  - If you still think it is useful, please open an issue to let me know
- Drop syntax support for qmake `pro` and `pro.user` file as they are out of
  scope of Qt for Python
- Drop support for continuous compilation of `rcc` as it is not used frequently
  - If you still think it is useful, please open an issue to let me know

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
