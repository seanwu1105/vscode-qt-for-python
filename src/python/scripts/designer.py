import sys

from common import (QtToolModuleNotFoundError, catch_known_errors,
                    is_installed, remove_vendor_suffix)


def run():
    if is_installed('PySide6'):
        from PySide6.scripts.pyside_tool import designer as main
    else:
        raise QtToolModuleNotFoundError('designer')
    sys.argv[0] = remove_vendor_suffix(sys.argv[0])
    sys.exit(main())


if __name__ == '__main__':
    catch_known_errors(run)
