import os

import pytest

from scripts.utils import SupportedQtDependencies
from tests import ASSETS_DIR, filter_available_qt_dependencies, invoke_script


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt6", "PyQt5"]),
)
def test_lupdate_help(qt_dependency: SupportedQtDependencies):
    help_arg = "--help" if qt_dependency == "PyQt6" else "-help"

    result = invoke_script("lupdate", [help_arg], qt_dependency)
    assert result.returncode == 0

    if qt_dependency in ("PySide2", "PyQt5"):
        assert len(result.stderr.decode("utf-8")) > 0
    else:
        assert len(result.stdout.decode("utf-8")) > 0


@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6", "PySide2", "PyQt6", "PyQt5"]),
)
def test_lupdate_sample_py(qt_dependency: SupportedQtDependencies):
    filename_no_ext = "sample"

    try:
        os.remove(get_assets_path(f"{filename_no_ext}.ts"))
    except FileNotFoundError:
        pass

    result = invoke_lupdate(filename_no_ext, qt_dependency)
    assert result.returncode == 0
    assert os.path.exists(get_assets_path(f"{filename_no_ext}.ts"))

    os.remove(get_assets_path(f"{filename_no_ext}.ts"))


def invoke_lupdate(filename_no_exi: str, qt_dependency: SupportedQtDependencies):
    return invoke_script(
        "lupdate",
        [
            get_assets_path(f"{filename_no_exi}.py"),
            "-ts",
            get_assets_path(f"{filename_no_exi}.ts"),
        ],
        qt_dependency,
    )


def get_assets_path(filename: str) -> str:
    return os.path.join(ASSETS_DIR, "linguist", filename)
