const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");

const { loginUser, loginAdvisor } = require("./gamptest");

const login = require("../elements/login");
const onboarding = require("../elements/onboarding");
const Menu = require("../elements/Menu");

const { type } = require("os");
const { error } = require("console");
const { on } = require("events");
const { futimesSync } = require("fs");

const { faker } = require("@faker-js/faker");

const foldername = faker.word.words();




async function Reciept(language = "de") {
    const driver = await getDriver();
    await loginUser("auto09@dev.in", "123456");
    try {
        const menu = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await menu.click();
        console.log("Menu Opened Sucessfully ✅")
        await click(Menu.taxDocument, { language });
        console.log("Reciepts opened Sucesfully ✅✅")
        // driver.pause(2000)
        // const plusicon = await driver.$("accessibility id:");
        // console.log("varaiable for Add icon created Successfully ✅✅✅")
        //   driver.pause(2000)
        //   await plusicon.click();

        const plusicon = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await plusicon.click();
        console.log("Clicked on the Add icon Sucessfully")
        await click(Menu.createFolder, { language });


    } catch (error) {
        console.log(error);
    }

}

async function MenuSelection(language = "de") {
    const driver = await initDriver();

    try {
        await Reciept();

    } catch (error) {

    }

}


if (require.main === module) {
    (async () => {
        await MenuSelection();

    })();
}

module.exports = {
    MenuSelection,
    Reciept,
}