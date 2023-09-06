import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_qmlformat_version(qt_dependency: SupportedQtDependencies):
    result = invoke_script("qmlformat", ["--version"], qt_dependency)

    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_qmlformat_format_file(qt_dependency: SupportedQtDependencies):
    filename = "unformatted.qml"
    reset_unformatted_qml_file(filename)

    result = invoke_script(
        "qmlformat", [get_assets_path(filename), "--inplace"], qt_dependency
    )

    assert result.returncode == 0

    with open(get_assets_path(filename), "r", encoding="utf-8") as file:
        assert file.read() == (
            "import QtQuick\n"
            "\n"
            "Rectangle {\n"
            "    width: 200\n"
            "    height: 100\n"
            '    color: "red"\n'
            "\n"
            "    Text {\n"
            "        anchors.centerIn: parent\n"
            '        text: "Hello, World!"\n'
            "    }\n"
            "}\n"
        )

    reset_unformatted_qml_file(filename)


def reset_unformatted_qml_file(filename: str):
    with open(get_assets_path(filename), "w", encoding="utf-8") as file:
        file.write(
            "import QtQuick\n"
            "Rectangle {\n"
            "width: 200\n"
            "height:    100\n"
            'color: "red"\n'
            "  \n"
            "    \n"
            "    Text{anchors.centerIn: parent\n"
            'text: "Hello, World!"\n'
            "}}\n"
        )


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_qmlformat_format_invalid_file(qt_dependency: SupportedQtDependencies):
    filename = "syntax_error.qml"

    result = invoke_script("qmlformat", [get_assets_path(filename)], qt_dependency)

    assert result.returncode != 0


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "qml", filename)
