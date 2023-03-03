import sys

from scripts.utils import is_installed, parse_qt_dependency


def test_is_installed():
    assert is_installed("not_exist_module") is False
    assert is_installed("PySide6") is True


def test_qt_dependency():
    original_argv = sys.argv

    assert parse_qt_dependency() is None

    sys.argv = ["test.py", "--vscode_extension_qt_dependency", "PySide6"]
    assert parse_qt_dependency() == "PySide6"
    assert sys.argv == ["test.py"]

    sys.argv = original_argv
