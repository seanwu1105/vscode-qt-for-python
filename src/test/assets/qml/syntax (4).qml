import QtQuick 2.121

Rectangle {
    id: colorbutton
    width: 200; height: 80;

    /* TODO: this is a todo.
    XXX: something
    FIXME: fixme!
    DEBUG: debug here!
    */

    // BUG: bug here!
    // FIXME: fixme!
    // XXX: xxXXX
    color: "red"

    TapHandler {
        id: inputHandler
    }

    Component.onCompleted: {
        color = Qt.binding(
        function() {
                return inputHandler.pressed ? "steelblue" : "lightsteelblue"
            }
        );
    }
}