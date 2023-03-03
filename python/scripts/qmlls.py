# pylint: disable=import-error

import sys

from utils import is_installed

if __name__ == "__main__":
    if is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import qmlls
    else:
        sys.exit("No qmlls can be found in current Python environment.")
    sys.exit(qmlls())
