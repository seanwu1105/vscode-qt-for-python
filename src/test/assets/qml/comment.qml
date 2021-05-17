import QtQuick 2.15 // comment
import QtQuick.Controls 1.4 // comment
import "myJs.js" as MyJs // comment
import T2 // comment

Rectangle {
    // comment
    Item {
        signal clicked // comment
        signal hovered() // comment
        signal actionPerformed(string action, var actionResult) // comment
    }
}
