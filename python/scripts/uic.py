import re
import sys

from utils import is_installed

if __name__ == "__main__":
    if is_installed("PySide6"):
        from PySide6.scripts.pyside_tool import uic
    elif is_installed("PySide2"):
        from PySide2.scripts.pyside_tool import uic
    elif is_installed("PyQt6"):
        from PyQt6.uic.pyuic import main as uic
    elif is_installed("PyQt5"):
        from PyQt5.uic.pyuic import main as uic
    else:
        sys.exit("No rcc can be found in current Python environment.")
    sys.argv[0] = re.sub(r"(-script\.pyw|\.exe)?$", "", sys.argv[0])
    sys.exit(uic())