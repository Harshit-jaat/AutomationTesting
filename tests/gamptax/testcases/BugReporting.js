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
const { faker } = require("@faker-js/faker");

const Bugtitle = faker.word.words();
const BugDescription = faker.word.words();

async function BugReport(language = "de") {
     const driver = await initDriver();
    await loginUser("auto09@dev.in", "123456");
    try {
        const menu = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await menu.click();
        await click(Settings.bug, {language});
        await typeInInput(Settings.BugTitle, Bugtitle, {language});
        console.log("Bug Title entered successfully");
        await typeInInput(Settings.bugDescription, BugDescription, {language})
        console.log("Bug Description entered successfully");
        await click(Settings.send, {language});
        console.log("✅Bug Reported Sucessfully✅")
    }
    catch(error){
        console.log(error);
    }
    
}
    if (require.main === module) {
        (async () => {
           await BugReport()
        })();
    }

    module.exports = {
        BugReport
    }
    

