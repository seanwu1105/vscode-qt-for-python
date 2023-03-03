import os
import sys

from PySide6.QtCore import QLibraryInfo, QLocale, QTranslator
from PySide6.QtWidgets import QApplication, QLabel, QMainWindow


class Window(QMainWindow):
    def __init__(self):
        super().__init__()
        label = QLabel(self.tr("Taiwan"))
        self.setCentralWidget(label)


if __name__ == "__main__":
    app = QApplication()

    path = QLibraryInfo.path(QLibraryInfo.LibraryPath.TranslationsPath)
    translator = QTranslator(app)
    if translator.load(QLocale.system(), "qtbase", "_", path):
        app.installTranslator(translator)
    translator = QTranslator(app)
    path = os.path.dirname(os.path.abspath(__file__))
    if translator.load(
        QLocale(QLocale.Language.Chinese, QLocale.Country.Taiwan),
        "example",
        "_",
        path,
        ".qm",
    ):
        print(f"load {translator.filePath()}")
        app.installTranslator(translator)

    window = Window()
    window.show()
    sys.exit(app.exec())
