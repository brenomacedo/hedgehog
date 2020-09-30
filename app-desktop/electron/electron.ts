import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import isDev from 'electron-is-dev'
import * as path from 'path'
import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('db.json')
const db = low(adapter)

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    minHeight: 600,
    minWidth: 800,
    titleBarStyle: "hidden",
    frame: false
  })

  // e carrega o arquivo index.html do seu aplicativo.
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`)

  // Abrir o DevTools (aba de ferramentas para desenvolvedores).
  ipcMain.on('resize', (event, args) => {
    if(args) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  ipcMain.on('min', () => {
    win.minimize()
  })

  ipcMain.on('close', () => {
    win.close()
  })

  ipcMain.on('setToken', (event, args) => {
    db.set('token', args).write()
  })

  ipcMain.on('getToken', (event) => {
    const token = db.get('token').value()
    event.reply('token', token)
  })
  
  ipcMain.on('showError', (event, args) => {
    dialog.showErrorBox(args.title, args.msg)
  })

}

// Este método será chamado quando Electron terminar de inicializar
// e também estiver pronto para criar novas janelas do navegador.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})