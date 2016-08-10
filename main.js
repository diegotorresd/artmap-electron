const electron = require('electron')
const {app, BrowserWindow} = electron

let win

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow({width, height})
  win.loadURL(`file://${__dirname}/maptest_fullscreen.html`)
  win.on('closed', () => win = null)
})

app.on('window-all-closed', () => app.quit())
