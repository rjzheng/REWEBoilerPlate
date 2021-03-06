const electron = require('electron')
// Module to control application life.
const {app, BrowserWindow} = electron
// Keeps the state of the window, displays the window at the same place as it was closed
const windowStateKeeper = require('electron-window-state')

require('electron-reload')(__dirname, {
  electron: require('${__dirname}/../../node_modules/electron')
})
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function (e) {

  // Keep track of the window's state
  let winState = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })

  // Create the browser window.
  mainWindow = new BrowserWindow({width: winState.width, height: winState.height, minWidth: 770, minHeight: 400, x: winState.x, y: winState.y, show: false})

  // Apply the winState manager
  winState.manage(mainWindow)

  // and load the index.html of the app.
  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, './public/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }))
  mainWindow.loadURL('http://localhost:8080');

  let mainContents = mainWindow.webContents

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
