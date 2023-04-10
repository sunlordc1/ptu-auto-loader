const ipcRenderer = require('electron').ipcRenderer

window.onload = function () {

}

function startShare() {
    ipcRenderer.send('start-share', {})
    document.getElementById("start").style.display = "none"
    document.getElementById("start").style.display = "block"

}
function stopShare() {
    ipcRenderer.send('stop-share', {})
    document.getElementById("start").style.display = "none"
    document.getElementById("start").style.display = "block"

}