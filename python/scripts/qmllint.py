import re
import sys

from PySide6.scripts.pyside_tool import qmllint

if __name__ == "__main__":
    sys.argv[0] = re.sub(r"(-script\.pyw|\.exe)?$", "", sys.argv[0])
    sys.exit(qmllint())
