import pytest

from scripts.utils import SupportedQtDependencies
from tests import filter_available_qt_dependencies, invoke_script


@pytest.mark.skip(reason="Ubuntu on GitHub Actions does not have libGL.so.1")
@pytest.mark.parametrize(
    "qt_dependency",
    filter_available_qt_dependencies(["PySide6"]),
)
def test_qml_help(qt_dependency: SupportedQtDependencies):
    result = invoke_script("qml", ["--help"], qt_dependency)
    assert result.returncode == 0
    assert len(result.stdout.decode("utf-8")) > 0
