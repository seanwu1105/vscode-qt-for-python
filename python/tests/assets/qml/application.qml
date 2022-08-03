import QtQuick 2.3
import QtQuick.Controls 1.4

ApplicationWindow {
    visible: true
    Rectangle {
        property real someNumber: .5
        width: 200
        height: 100
        color: "red"
        Text {
            anchors.centerIn: parent
            text: parent.someNumber
        }
    }
}

