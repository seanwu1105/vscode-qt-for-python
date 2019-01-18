//Style.qml with custom singleton type definition
pragma Singleton
import QtQuick 2.0

QtObject {
    property int textSize: 20
    property color textColor: "green"
}

// singleton type in use
import QtQuick 2.0
import CustomStyles 1.0

Text {
    font.pixelSize: Style.textSize
    color: Style.textColor
    text: "Hello World"
}