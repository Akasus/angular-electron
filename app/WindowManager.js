"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWindow = void 0;
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
let windows = new Set();
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');
function createWindow(title) {
    const size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    let win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        minHeight: 300,
        minWidth: 500,
        transparent: true,
        zoomToPageWidth: true,
        frame: false,
        title: title,
        titleBarStyle: 'hidden',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            allowRunningInsecureContent: (serve),
            contextIsolation: true, // false if you want to run e2e test with Spectron
        },
    });
    windows.add(win);
    if (serve) {
        const debug = require('electron-debug');
        debug();
        require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');
    }
    else {
        // Path when running electron executable
        let pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../dist/index.html';
        }
        const url = new URL(path.join('file:', __dirname, pathIndex));
        win.loadURL(url.href);
    }
    win.webContents.openDevTools({ mode: 'detach' });
    // Emitted when the window is closed.
    win.on('closed', () => {
        windows.delete(win);
    });
    // Test actively push message to the Electron-Renderer
    win.webContents.on('did-finish-load', () => {
        win === null || win === void 0 ? void 0 : win.webContents.send('main-process-message', new Date().toLocaleString());
    });
}
exports.createWindow = createWindow;
//# sourceMappingURL=WindowManager.js.map