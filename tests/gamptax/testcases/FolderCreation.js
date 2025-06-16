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

    try {
        const menu = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await menu.click();
        console.log("Menu Opened Sucessfully ✅")
        await click(Menu.taxDocument, { language });
        console.log("Reciepts opened Sucesfully ✅✅")
        await driver.pause(1000);
        const pageSource = await driver.getPageSource();
        console.log(pageSource);


        const plusIcons = await driver.$$('accessibility id:');
        console.log(`✅✅✅✅Found ${plusIcons.length} elements with ''`);

        for (let i = 0; i < plusIcons.length; i++) {
            const el = plusIcons[i];
            const displayed = await el.isDisplayed();
            const bounds = await el.getAttribute("bounds");
            const clickable = await el.getAttribute("clickable");

            console.log(` ✅✅✅✅✅Index: ${i}, displayed: ${displayed}, clickable: ${clickable}, bounds: ${bounds}`);
        }

        // const el1 = await driver.$("accessibility id:");
        // await el1.waitForDisplayed({ timeout: 5000 });
        // await el1.click();
        // console.log("✅ Tapped Add icon using accessibility id sucessfully)");
        const plusIcon = await driver.$('//android.widget.TextView[contains(@text,"")]');
        await plusIcon.waitForDisplayed({ timeout: 3000 });
        await plusIcon.click();
        console.log("✅ Successfully clicked the Add () icon 🎯");

        await driver.pause(2000); // allow transition
        await click(Menu.createFolder, { language })
        await driver.pause(2000);
        const el2 = await driver.$("android.widget.EditText");
        await el2.click();
        await el2.clearValue();
        await driver.pause(500);
        await el2.setValue(foldername);
        console.log("✅ Tried setValue directly");
        // console.log("✅✅cleared the field successfully")

        //  await typeInInput(el2, foldername,{language});

        await click(Menu.createFolder.create, { language });
        console.log("✅Folder created sucessfuly");
        await driver.pause(5000);

        // const editoption = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        // await editoption.click();
        // const deleteoption = await driver.$("accessibility id:, Löschen");
        // await deleteoption.click();
        // const confirmdelete = await driver.$("id:android:id/button1");
        // await confirmdelete.click();
        // await driver.pause(5000);







    } catch (error) {
        console.log(error);
    }

}


async function BankStatements(language) {
    const driver = await getDriver();

    try {
        const menu1 = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await menu1.click();
        console.log("Menu Opened Sucessfully ✅")
        await click(Menu.bankStatements, { language });
        console.log("Tools opened Sucesfully ✅✅")
        await driver.pause(1000);
        const addIcon = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
        await addIcon.waitForDisplayed({ timeout: 3000 });
        await addIcon.click();
      

        console.log("✅ Successfully clicked the Add () icon 🎯");

        await driver.pause(2000); // allow transition
        await click(Menu.createFolder, { language })
        await driver.pause(2000);
        const el2 = await driver.$("android.widget.EditText");
        await el2.click();
        await el2.clearValue();
        await driver.pause(500);
        await el2.setValue(foldername);
        console.log("✅ Tried setValue directly");
        await click(Menu.createFolder.create, { language });
        console.log("✅Folder created sucessfuly");
        await driver.pause(5000);
    }
    catch (error) {
        console.error("❌ Error in BankStatements:", error);
    }

}

async function MenuSelection(language = "de") {
    const driver = await initDriver();
    await loginUser("auto09@dev.in", "123456");

    try {
        await Reciept();
        await driver.terminateApp("com.agp.app");
        await driver.activateApp("com.agp.app");
        await driver.pause(2000);
        console.log("✅✅App closed successfuly")
        // await driver.pause(2000);
        // const el1 = await driver.$('//android.widget.TextView[contains(@text,""]');
        // await el1.click();
        // await driver.pause(2000);
        console.log("✅✅✅Bank Statement function started running.");
        await BankStatements();

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