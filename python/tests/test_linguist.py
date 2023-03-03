import pytest

from scripts.utils import SupportedQtDependencies
from tests import filter_available_qt_dependencies, invoke_script


@pytest.mark.skip(reason="a GUI app cannot be closed gracefully")
@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_qml_help(qt_dependency: SupportedQtDependencies):
    result = invoke_script("linguist", [], qt_dependency)
    assert result.returncode == 0
