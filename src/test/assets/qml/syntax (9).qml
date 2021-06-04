// Related Issue: https://github.com/seanwu1105/vscode-qt-for-python/issues/116

Card {
    nameFilters: [ root.nameFilter ].concat(["text"])

    property list<Rectangle> childRects: [
        Rectangle { color: "red" },
        Rectangle { color: "blue"}
    ].find()
}