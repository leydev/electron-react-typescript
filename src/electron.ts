import { app, BrowserWindow, Menu, globalShortcut } from 'electron';

let window: BrowserWindow;

function createWindow(): BrowserWindow {
    const win: BrowserWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    Menu.setApplicationMenu(null);
    win.maximize();

    switch (process.env.NODE_ENV) {
        case 'development':
            win.loadURL("http://127.0.0.1:8001");
            win.webContents.openDevTools();
            break;
        default:
            win.loadFile("build/renderer/index.html");
            break;
    }

    globalShortcut.register('CommandOrControl+I', () => {
        console.log('Opening the dev tools');
        win.webContents.openDevTools();
    })

    return win;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

app.on("quit", () => {
    process.exit(0);
})
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        window = createWindow();
    }
});
