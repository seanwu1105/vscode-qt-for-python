# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import linguist

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import linguist
    else:
        sys.exit("No Qt Linguist can be found in current Python environment.")

    sys.exit(linguist())
