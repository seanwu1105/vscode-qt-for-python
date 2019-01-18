import QtQuick 2.3
import QtQuick.Controls 1.4
import "fuck.js" as Fuck
import T2

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
        shouldBeBlue: 101.2
        shouldBeBlue2: Text {
            // contents
        }
    }
}