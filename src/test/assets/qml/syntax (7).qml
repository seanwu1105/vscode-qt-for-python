Rectangle {
    property color previousColor
    property color nextColor
    property int someNumber
    property string someString
    property url someUrl
    property var someVar
    property variant someVariant
    property bool someBool
    property double someDouble
    property date someDate
    property point somePoint
    property rect someRect
    property size someSize
    property alias color: rectangle.border.color
    // declaration with initialization
    property list<Rectangle> childRects: [
        Rectangle { color: "red" },
        Rectangle { color: "blue"}
    ]
    property var items: ["Small", "Medium", "Large"]
    onNextColorChanged: console.log("The next color will be: " + nextColor.toString())
    NumberAnimation on x {
        from: 0
        to: 350
        loops: Animation.Infinite
        duration: 2000
    }

    Text {
        //group notation
        font { pixelSize: 12; b: true }
    }

    Item {
        signal clicked
        signal hovered()
        signal actionPerformed(string action, var actionResult)
    }
}
