SpinBox {
    menuBar: MenuBar {
        Menu {
            title: "&File"
            Action {text: "&New..."}
            Action {text: "&Open..."}
            Action {text: "&Save"}
            Action {text: "Save &As..."}
            MenuSeparator {}
            Action {text: "&Quit"}
        }
        Menu {
            title: "&Edit"
            Action {text: "Cu&t"}
            Action {text: "&Copy"}
            Action {text: "&Paste"}
        }
        Menu {
            title: "&Help"
            Action {text: "&About"}
        }
    }
    function calculateHeight() {
        return rect.width / 2;
    }
    function moveTo(newX, newY) {
        label.x = newX;
        label.y = newY;
    }
    textFromValue: function(value) {
        return items[value];
    }
    
    height: parent.height / 2

    height: Math.min(parent.width, parent.height)

    height: parent.height > 100 ? parent.height : parent.height/2

    height: {
        if (parent.height > 100)
            return parent.height
        else
            return parent.height / 2
    }

    height: someMethodThatReturnsHeight()

    valueFromText: function(text) {
        for (var i = 0; i < items.length; ++i)
            if (items[i].toLowerCase().indexOf(text.toLowerCase()) === 0)
                return i
        return sb.value
    }
    Layout.fillWidth: true
    
}