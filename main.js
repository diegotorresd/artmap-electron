const electron = require('electron')
const {app, BrowserWindow} = electron
const fs = require('fs')

let win

app.on('ready', () => {
  const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
  let maps = readConfig('./maps.json')
  let m = maps["whistler"]
  win = new BrowserWindow({width, height})
  win.loadURL(`file://${__dirname}/maptest_fullscreen.html?m=${encodeURI(JSON.stringify(m))}`)
  win.on('closed', () => win = null)
})

function readConfig(configPath) {
  let result = fs.readFileSync(configPath, 'utf8')
  return JSON.parse(result);
}

app.on('window-all-closed', () => app.quit())
