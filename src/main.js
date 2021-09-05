const { app, BrowserWindow, ipcMain } = require('electron');
const { input } = require('midi');
const midi = require('midi');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nativeWindowOpen: true,
      
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// API to expose MIDI and ATEM to the preload process
// https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron
const midiin = new midi.Input();


// When event recieved from renderer
ipcMain.on("enableMIDI", (event, args) => {

  // Theres no input validation here deal with it
  if (args) { midiin.openPort(0); }
  else { midiin.closePort(0); }

});


// When midi port is open, and message is recieved, execute
midiin.on('message', (deltaTime, message) => {

  // for debugging
  mainWindow.webContents.send("MIDIinput", message);
  console.log(`m: ${message} d: ${deltaTime}`);

});
