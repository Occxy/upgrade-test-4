const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
	autoUpdater.checkForUpdatesAndNotify();
    var valeur = prompt("Message à afficher");
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});


/*checking for updates*/
autoUpdater.on("checking-for-update", () => {
  //your code
});

/*No updates available*/
autoUpdater.on("update-not-available", info => {
  //your code
});

/*New Update Available*/
autoUpdater.on("update-available", info => {
  //your code
});

/*Download Status Report*/
autoUpdater.on("download-progress", progressObj => {
 //your code
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", info => {
 //your code
});

/*Checking updates just after app launch and also notify for the same*/
app.on("ready", function() {
 autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});
