import {app, BrowserWindow , screen} from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let windows = new Set<BrowserWindow>();

const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

export function createWindow(title: string) {

  const size = screen.getPrimaryDisplay().workAreaSize;


  // Create the browser window.
 let win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    minHeight:300,
    minWidth:500,
    transparent: true,
    zoomToPageWidth: true,
    frame:false,
    title: title,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: true,  // false if you want to run e2e test with Spectron
    },
  });

  windows.add(win);
  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
       // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  win.webContents.openDevTools({mode: 'detach'});

  // Emitted when the window is closed.
  win.on('closed', () => {
    windows.delete(win);
  });

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
     win?.webContents.send('main-process-message', new Date().toLocaleString())
   })
}
