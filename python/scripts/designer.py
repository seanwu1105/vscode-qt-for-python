# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import designer
    elif dep == "PySide2":
        from PySide2.scripts.pyside_tool import designer

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import designer
    elif is_installed("PySide2"):
        from PySide2.scripts.pyside_tool import designer
    else:
        sys.exit("No rcc can be found in current Python environment.")
    sys.exit(designer())
