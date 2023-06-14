# pylint: disable=import-error,ungrouped-imports

import sys

from utils import is_installed, parse_qt_dependency

if __name__ == "__main__":
    dep = parse_qt_dependency()
    if dep == "PySide6":
        from PySide6.scripts.pyside_tool import qmlls

    elif is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import qmlls
    else:
        ERR_MSG = (
            "No qmlls can be found in the current Python environment. "
            "Make sure the latest PySide6 is installed. "
            "Update configuration to disable qmlls integration if you don't need it."
        )
        sys.exit(ERR_MSG)
    sys.exit(qmlls())
