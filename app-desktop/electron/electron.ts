import { app, BrowserWindow, ipcMain } from 'electron'
import isDev from 'electron-is-dev'
import * as path from 'path'


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
      win.setFullScreen(false)
    } else {
      win.setFullScreen(true)
    }
  })

  ipcMain.on('min', () => {
    win.minimize()
  })

  ipcMain.on('close', () => {
    win.close()
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