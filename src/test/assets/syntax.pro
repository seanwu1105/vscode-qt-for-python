CONFIG += c++11
SOURCES += \
        main.cpp \
        mainwindow.cpp \
        zh_TW.ts
HEADERS += \
        mainwindow.h
FORMS += \
        mainwindow.ui
# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target
include(../shared.pri)
TEMPLATE = app
TARGET   = simpleax

CONFIG += warn_off
QT += widgets axserver

SOURCES  = main.cpp
RC_FILE  = simple.rc
DEF_FILE = simple.def

# install
target.path = $$[QT_INSTALL_EXAMPLES]/activeqt/simple
INSTALLS += target