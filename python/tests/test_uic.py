import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt6", "PyQt5"]),
)
def test_uic_version(qt_dependency: SupportedQtDependencies):
    result = invoke_script("uic", ["--version"], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt6", "PyQt5"]),
)
def test_uic_sample_ui(qt_dependency: SupportedQtDependencies):
    filename = "sample.ui"
    result = invoke_script("uic", [get_assets_path(filename)], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "ui", filename)
