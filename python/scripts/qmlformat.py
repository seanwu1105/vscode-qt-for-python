# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import qmlformat

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import qmlformat
    else:
        ERR_MSG = (
            "No qmlformat can be found in the current Python environment. "
            "Make sure the latest PySide6 is installed. "
            "Update configuration to disable qmlformat integration if you don't need it."
        )
        sys.exit(ERR_MSG)
    sys.exit(qmlformat())
