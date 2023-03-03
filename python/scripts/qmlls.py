# pylint: disable=import-error

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import qmlls

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import qmlls
    else:
        sys.exit("No qmlls can be found in current Python environment.")
    sys.exit(qmlls())
