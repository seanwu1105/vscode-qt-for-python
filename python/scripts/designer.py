# pylint: disable=import-error

import sys

from utils import is_installed

if __name__ == "__main__":
    if is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import designer
    elif is_installed("PySide2"):
        from PySide2.scripts.pyside_tool import designer
    else:
        sys.exit("No rcc can be found in current Python environment.")
    sys.exit(designer())
