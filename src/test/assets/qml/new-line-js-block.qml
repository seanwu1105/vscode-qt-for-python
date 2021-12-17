UserButton {
    id: plotButton
    x: typeColumnLayout.x + 20
    y: typeColumnLayout.y + typeColumnLayout.height + 20
    font.pixelSize: topItem.pixelSize + 1
    Layout.alignment: Qt.AlignHCenter | Qt.AlignVCenter
    text: checked? qsTr("停止") : qsTr("绘图")
    property bool waiting: false
    onClicked       :        
        {    
        if(!waiting)
        {
            waiting = true
            if(checked)
            {
                
                for(let [key, value] of ObjCreation.objs)
                {
                    log.write(Verbose.Debug, `Charts Object: ${key}`)
                }
            }
            else
            {
                log.write(Verbose.Debug, "try close plot thread.")
                checked = true
                plot.stop()
            }
        }
    }

    onCreated       :            {   
        if(!waiting)
        {
            waiting = true
            if(checked)
            {
                
                for(let [key, value] of ObjCreation.objs)
                {
                    log.write(Verbose.Debug, `Charts Object: ${key}`)
                }
            }
            else
            {
                log.write(Verbose.Debug, "try close plot thread.")
                checked = true
                plot.stop()
            }
        }
    }
}