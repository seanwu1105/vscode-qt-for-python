# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import qml

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import qml
    else:
        ERR_MSG = (
            "No pyside6-qml can be found in the current Python environment. "
            "Make sure the latest PySide6 is installed."
        )
        sys.exit(ERR_MSG)
    sys.exit(qml())
