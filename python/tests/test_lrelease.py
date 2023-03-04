import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script
from tests.test_lupdate import invoke_lupdate


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_lrelease_help(qt_dependency: SupportedQtDependencies):
    result = invoke_script("lrelease", ["-help"], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_lrelease_sample_ts(qt_dependency: SupportedQtDependencies):
    filename_no_ext = "sample"

    try:
        os.remove(get_assets_path(f"{filename_no_ext}.qm"))
    except FileNotFoundError:
        pass

    invoke_lupdate(filename_no_ext, qt_dependency)

    result = invoke_script(
        "lrelease", [get_assets_path(f"{filename_no_ext}.ts")], qt_dependency
    )
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0

    os.remove(get_assets_path(f"{filename_no_ext}.qm"))


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "linguist", filename)
