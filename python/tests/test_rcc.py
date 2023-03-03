import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt5"]),
)
def test_rcc_help(qt_dependency: SupportedQtDependencies):
    help_arg = "-help" if qt_dependency == "PyQt5" else "--help"
    result = invoke_script("rcc", [help_arg], qt_dependency)

    if qt_dependency == "PyQt5":
        assert result.returncode != 0
        assert len(result.stderr.decode("utf-8")) > 0
    else:
        assert result.returncode == 0
        assert len(result.stdout.decode("utf-8")) > 0


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt5"]),
)
def test_rcc_sample_qrc(qt_dependency: SupportedQtDependencies):
    filename = "sample.qrc"
    result = invoke_script("rcc", [get_assets_path(filename)], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "qrc", filename)
