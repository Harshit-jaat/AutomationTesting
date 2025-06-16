const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");

const { loginUser, loginAdvisor } = require("./gamptest");

const login = require("../elements/login");
const Menu = require("../elements/Menu");
const { type } = require("os");
const { error } = require("console");
const { on } = require("events");
const { futimesSync } = require("fs");
const Settings = require("../elements/Settings");

async function ChangeLanguage(language = "de") {
    const driver = await initDriver();
    await loginUser("auto09@dev.in", "123456");
    try {
        const menu = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await menu.click();
        await click(Settings.settings, { language });
        await click(Settings.changeLanguage, { language });
        await click(Settings.Languages, {language : "en"});
        console.log("✅Language changed successfully.")
    } catch (error) {
        console.log(error);
    }
}

if (require.main === module) {
    (async () => {
        await ChangeLanguage();

    })();
}

module.exports = {
    ChangeLanguage
}