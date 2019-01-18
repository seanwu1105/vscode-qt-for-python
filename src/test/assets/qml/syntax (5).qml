import QtQuick 2.1

Item {
    function fibonacci(n){
        var arr = [0, 1];
        for (var i = 2; i < n + 1; i++)
            arr.push(arr[i - 2] + arr[i -1]);

        return arr;
    }
    
    TapHandler {
        onTapped: console.log(fibonacci(10))
    }
    Rectangle {
        property color previousColor
        property color nextColor
        onNextColorChanged: console.log("The next color will be: " + nextColor.toString())
    }
}