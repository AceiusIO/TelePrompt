// -- TelePrompt Debugger Commands -- \\

function log(input) {
    console.log(input)
}

function admin_cmd(input) {

    console.clear()

    if (input == "help") {
        //Activate Help
        log("TelePrompt " + ver);
        log("By AceiusIO");
        log("==========================");
        log("HELP:");
        log("==========================");
        log("COMANDS:");
        log("");
        log("`help()` - Display this menu");
        log("`admin_cmd(test)` - Skip directly to testing");
    } else {
        if (input == "test") {
            //Skip to testing
            start();
            record();
        } else {
            log("TelePrompter does not know `admin_cmd(" + input + ")`, try `help()`");
        }
    }
}