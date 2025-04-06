const path = require("path");
const { getLatestAPK, getConnectedDevice } = require("../tests/utils/helpers");

const deviceId = getConnectedDevice();

if (!deviceId) {
    throw new Error("❌ No connected Android device found. Please connect one before running tests.");
}

module.exports = {
    server: {
        hostname: "localhost",
        port: 4723,
        path: "/" // Appium 2.x base path
    },
    capabilities: {
        platformName: "Android",
        "appium:deviceName": deviceId,
        "appium:udid": deviceId, // optional but recommended
        "appium:app": getLatestAPK(),
        "appium:automationName": "UiAutomator2",
        "appium:noReset": false,
        "appium:fullReset": false,
        "appium:newCommandTimeout": 300
    }
};



//for inspector capabilities
// {
//     "platformName": "Android",
//     "deviceName": "TRJDU19404007242",  
//     "automationName": "UiAutomator2",
//     "noReset": true
//   }
  