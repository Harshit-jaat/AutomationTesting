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
        "appium:noReset": true
    }
};
