"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const logger_1 = require("./logger");
const WindowManager_1 = require("../WindowManager");
function InitHandles() {
    electron_1.ipcMain.handle('get-data', (event, ...args) => {
        var window = electron_1.BrowserWindow.fromWebContents(event.sender);
        logger_1.default.log('Windows requests Title');
        return window === null || window === void 0 ? void 0 : window.title;
    });
    electron_1.ipcMain.handle('get-log', (event, request, query) => logger_1.default.getLog(request, query));
    electron_1.ipcMain.handle('get-Files', () => { });
    electron_1.ipcMain.handle('close-window', (event, ...args) => {
        var _a;
        (_a = electron_1.BrowserWindow.fromWebContents(event.sender)) === null || _a === void 0 ? void 0 : _a.close();
    });
    electron_1.ipcMain.handle('minimize-window', (event, ...args) => {
        var _a;
        (_a = electron_1.BrowserWindow.fromWebContents(event.sender)) === null || _a === void 0 ? void 0 : _a.minimize();
    });
    electron_1.ipcMain.handle('maximize-window', (event, ...args) => {
        let win = electron_1.BrowserWindow.fromWebContents(event.sender);
        (win === null || win === void 0 ? void 0 : win.isMaximized()) ? win === null || win === void 0 ? void 0 : win.unmaximize() : win === null || win === void 0 ? void 0 : win.maximize();
    });
    // new window example arg: new windows url
    electron_1.ipcMain.handle('open-win', (event, args) => {
        (0, WindowManager_1.createWindow)(args.title);
    });
}
exports.default = InitHandles;
//# sourceMappingURL=Handles.js.map