import os
import sys

from common import (QtToolModuleNotFoundError, catch_known_errors,
                    is_installed, remove_vendor_suffix)


def run():
    sys.argv[0] = remove_vendor_suffix(sys.argv[0])

    # lupdate-pyside6 is deprecated can have bug:
    # https://bugreports.qt.io/browse/PYSIDE-1376?focusedCommentId=562463&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-562463
    # if is_installed('PySide6'):
    #     from PySide6.scripts.pyside_tool import main
    if is_installed('PyQt6'):
        from PyQt6.lupdate.pylupdate import main
    elif is_installed('PySide2'):
        from PySide2.scripts.pyside_tool import main
        sys.argv[0] = os.path.join(
            os.path.dirname(sys.argv[0]),
            f'pyside2-{os.path.basename(sys.argv[0])}'
        )
    elif is_installed('PyQt5'):
        from PyQt5.pylupdate_main import main
    else:
        raise QtToolModuleNotFoundError('lupdate')
    sys.exit(main())


if __name__ == '__main__':
    catch_known_errors(run)
