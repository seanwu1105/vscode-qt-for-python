# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import lupdate
    elif dep == "PySide2":
        sys.argv[0] = "pyside2-lupdate"
        from PySide2.scripts.pyside_tool import main as lupdate
    elif dep == "PyQt6":
        from PyQt6.lupdate.pylupdate import main as lupdate
    elif dep == "PyQt5":
        from PyQt5.pylupdate_main import main as lupdate

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import lupdate
    elif is_installed("PySide2"):
        sys.argv[0] = "pyside2-lupdate"
        from PySide2.scripts.pyside_tool import main as lupdate
    elif is_installed("PyQt6"):
        from PyQt6.lupdate.pylupdate import main as lupdate
    elif is_installed("PyQt5"):
        from PyQt5.pylupdate_main import main as lupdate
    else:
        ERR_MSG = (
            "No lupdate can be found in the current Python environment. "
            "Make sure the latest PySide6, PySide2, PyQt6 or PyQt5 is installed."
        )
        sys.exit(ERR_MSG)

    sys.exit(lupdate())
