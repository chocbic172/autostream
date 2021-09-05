const { contextBridge, ipcRenderer } = require('electron');

// Exposing protected mothods to allow secure transport or somthing im not a node dev
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["enableMIDI"];
            if (validChannels.includes(channel)) {
                console.log('send');
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["MIDIinput"];
            ipcRenderer.on(channel, (event, ...args) => func(...args));
            console.log('recv');
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);