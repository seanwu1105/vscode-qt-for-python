import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script


@pytest.mark.skip(reason="a GUI app cannot be closed gracefully")
@pytest.mark.parametrize(
    "qt_dependency", filter_available_qt_dependencies(["PySide6", "PySide2"])
)
def test_designer_sample_ui(qt_dependency: SupportedQtDependencies):
    filename = "sample.ui"
    result = invoke_script("designer", [get_assets_path(filename)], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "ui", filename)
