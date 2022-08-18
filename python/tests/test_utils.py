from scripts.utils import is_installed


def test_is_installed():
    assert is_installed("not_exist_module") == False
    assert is_installed("PySide6") == True
