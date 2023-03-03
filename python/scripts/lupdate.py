# pylint: disable=import-error

import sys

from utils import is_installed

if __name__ == "__main__":
    if is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import lupdate
    elif is_installed("PySide2"):
        sys.argv[0] = "pyside2-lupdate"
        from PySide2.scripts.pyside_tool import main as lupdate
    elif is_installed("PyQt6"):
        from PyQt6.lupdate.pylupdate import main as lupdate
    elif is_installed("PyQt5"):
        from PyQt5.pylupdate_main import main as lupdate
    else:
        sys.exit("No lupdate can be found in current Python environment.")

    sys.exit(lupdate())
