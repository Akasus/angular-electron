import { BrowserWindow, ipcMain } from "electron";
import logger from "./logger";
import { createWindow } from "../WindowManager";

export default function InitHandles(){
  ipcMain.handle('get-data', (event, ...args) => {
    var window = BrowserWindow.fromWebContents(event.sender);
    logger.log('Windows requests Title');
    return window?.title;
  });
  ipcMain.handle('get-log', (event, request, query) => logger.getLog(request, query));

  ipcMain.handle('get-Files', () => { })

  ipcMain.handle('close-window', (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender)?.close();
  })

  ipcMain.handle('minimize-window', (event, ...args) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize();
  })


  ipcMain.handle('maximize-window', (event, ...args) => {
    let win = BrowserWindow.fromWebContents(event.sender);
    win?.isMaximized() ? win?.unmaximize() : win?.maximize();
  })

  // new window example arg: new windows url
  ipcMain.handle('open-win', (event, args) => {
    createWindow(args.title);
  })

}
