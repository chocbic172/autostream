/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

window.addEventListener('DOMContentLoaded', () => {
    var running = false;

    // Set HTML constants
    var on_button = document.getElementById("on-button");
    var top_on_button = document.getElementById("top-on-button")
    var config_button = document.getElementById("config-button");
    var top_config_button = document.getElementById("top-config-button")
    var main_content = document.getElementById("main-content");
    var top_content = document.getElementById("top-content");
    var status = document.getElementById("status");
    var top_status = document.getElementById("top-status");
    var config_content = document.getElementById("config-content");
    var code = document.getElementById("code");

    // Function to toggle is script is running
    function toggle_running() {
        if (running) {
            status.innerHTML = "inactive";
            top_status.innerHTML = "inactive";
            on_button.innerHTML = "TURN ON"
    
            status.style = "color: rgb(221, 75, 75);"
            top_status.style = "color: rgb(221, 75, 75);"
            on_button.style = "border-color: rgb(137, 219, 105)";
            
            window.api.send("enableMIDI", "");

            window.api.receive("MIDIinput", (data) => {
                console.log(`Received ${data} from main process`);
            });

            running = false;
            
        } else {
            status.innerHTML = "active";
            top_status.innerHTML = "active";
            on_button.innerHTML = "TURN OFF"
    
            status.style = "color: rgb(137, 219, 105)";
            top_status.style = "color: rgb(137, 219, 105)";
            on_button.style = "border-color: rgb(221, 75, 75);"

            running = true;
        }
    }


    // When ON button is clicked, execute
    on_button.addEventListener('click', toggle_running);
    top_on_button.addEventListener('click', toggle_running);

    // When CONFIG or the CONFIG CLOSE button is clicked, execute
    config_button.addEventListener('click', () => {
        main_content.style = "display: none;"
        top_content.style = "display: flex;"
        config_content.style = "display: block;"
    })

    top_config_button.addEventListener('click', () => {
        top_content.style = "display: none;"
        main_content.style = "display: flex;"
        config_content.style = "display: none;"
    })
});
