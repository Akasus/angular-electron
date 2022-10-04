
import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { createWindow } from './WindowManager';
import InitHandles from './components/Handles';

fs.mkdirSync(path.join(__dirname,'./database'), {recursive: true});

let isMaximized = false;
let windows = new Set<BrowserWindow>();


(async ()=> {
  try {

    InitHandles();

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    app.on('ready', () => {
      setTimeout(createWindow, 400,"My Angular App");
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      const allWindows = BrowserWindow.getAllWindows()
    if (allWindows.length) {
      allWindows[0].focus()
    } else {
      createWindow('My active App')
    }
    });
  } catch (e) {
    // Catch Error
    // throw e;
  }

})();
