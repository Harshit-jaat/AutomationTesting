const { remote } = require("webdriverio");
const appiumConfig = require("../config/appium.config");

async function runTest() {
    console.log(`📂 Using APK: ${appiumConfig.capabilities["appium:app"]}`);

    const driver = await remote({
        ...appiumConfig.server,
        capabilities: { alwaysMatch: appiumConfig.capabilities, firstMatch: [{}] }
    });

    try {
        console.log("🚀 Running Binogi Login Test...");
        
        // Example: Click Login Button
        const loginButton = await driver.$("id=com.binogi.app:id/login_button");
        await loginButton.click();

        console.log("✅ Test Passed!");
    } catch (error) {
        console.error("❌ Test Failed!", error);
    } finally {
        await driver.deleteSession();
    }
}

runTest();
