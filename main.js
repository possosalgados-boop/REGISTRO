const { app, BrowserWindow } = require('electron');

function crearVentana() {
    const ventana = new BrowserWindow({
        width: 800,
        height: 600,
    });

    ventana.loadFile('index.html');
}

app.whenReady().then(crearVentana);