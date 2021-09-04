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

    // Function to toggle is script is running
    function toggle_running() {
        if (running) {
            status.innerHTML = "inactive";
            top_status.innerHTML = "inactive";
            on_button.innerHTML = "TURN ON"
    
            status.style = "color: rgb(221, 75, 75);"
            top_status.style = "color: rgb(221, 75, 75);"
            on_button.style = "border-color: rgb(137, 219, 105)";
    
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


    // When on button is clicked, execute
    on_button.addEventListener('click', toggle_running);
    top_on_button.addEventListener('click', toggle_running);

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