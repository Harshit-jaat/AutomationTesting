const path = require("path");
const { getLatestAPK } = require("../tests/utils/helpers");

module.exports = {
    server: {
        hostname: "localhost",
        port: 4723,
        path: "/" // Ensure this is correct for Appium 2.x
    },
    capabilities: {
        platformName: "Android",
        "appium:deviceName": "TRJDU19404007242",  // Update based on adb devices
        "appium:app": getLatestAPK(), // Dynamically fetch latest APK
        "appium:automationName": "UiAutomator2",
        "appium:noReset": false,  // Clears app data but does NOT uninstall
        "appium:fullReset": false, // Prevents reinstalling the app
        "appium:newCommandTimeout": 300, // Prevents timeout issues
    }
};



//for inspector capabilities
// {
//     "platformName": "Android",
//     "deviceName": "TRJDU19404007242",  
//     "automationName": "UiAutomator2",
//     "noReset": true
//   }
  