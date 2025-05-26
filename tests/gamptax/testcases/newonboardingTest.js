const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const {
    enablePlayStore,
    disablePlayStore,
} = require("../../utils/ChangeCountry");
const { type } = require("os");
const login = require("../elements/login");
const onboarding = require("../elements/onboarding");
const { loginUser, loginAdvisor } = require("./gamptest");
const { error } = require("console");
const { faker } = require("@faker-js/faker");
const { on } = require("events");
const firstname = faker.person.firstName();
const lastname = faker.person.lastName();
const email = faker.internet.email();
const mobile = "787878789789";
const telephone = faker.phone.imei();
const street = faker.location.streetAddress();
const town = faker.location.city();
const postalcode = faker.location.zipCode();
const idNum = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();
const Taxoffice = faker.person.jobTitle();
const TaxNum = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();
const denomination = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();




async function ScreenOne(language = "de") {
    try {
        // console.log("✅✅✅✅✅✅✅✅");
        // console.log("Function Started");
        const ok = await driver.$("id:android:id/button1");
        await click(onboarding.Screen1.companyType, { language, print: true });
        await click(onboarding.Screen1.privateperson, { language, print: true });
        await typeInInput(onboarding.Screen1.firstName, firstname, { language, print: true, });
        await typeInInput(onboarding.Screen1.lastName, lastname, { language, print: true, });
        await click(onboarding.Screen1.DOB, { language: "de" });
        await ok.click();
        await click(onboarding.Screen1.maritalStatus, { language, print: true });
        await click(onboarding.Screen1.maritalStatus.married);
        await click(onboarding.continueButton, { language, print: true });

    } catch (error) {
        console.log(error)
    }
}
async function ScreenTwo(language = "de") {
    try {
        await typeInInput(onboarding.Screen2.Email, email, {
            language,
            print: true,
        });
        await typeInInput(onboarding.Screen2.mobileNo, mobile, {
            language,
            print: true,
        });
        await typeInInput(onboarding.Screen2.telephoneNo, telephone, {
            language,
            print: true,
        });
        await typeInInput(onboarding.Screen2.street, street, {
            language,
            print: true,
        });
        await typeInInput(onboarding.Screen2.town, town, { language, print: true });
        await typeInInput(onboarding.Screen2.postalCode, postalcode, { language, print: true, });
        const el1 = await driver.$('-android uiautomator:new UiSelector().text("").instance(0)');
        await el1.click();
        await click(onboarding.Screen2.usecamera, { language, print: true });
        const elone = await driver.$("accessibility id:Take photo. Button. Double-tap to take a photo. Double-tap and hold to take burst photos");
        await elone.click();
        const el2 = await driver.$("id:com.android.camera:id/done_button");
        await el2.click();
        const el3 = await driver.$("id:com.agp.app:id/crop_image_menu_crop");
        await el3.click();
        await el1.click();
        await click(onboarding.Screen2.usecamera, { language, print: true });
        await elone.click();
        await el2.click();
        await el3.click();
        await click(onboarding.continueButton);



    } catch (error) {
        console.log(error)
    }
}

async function ScreenThree(language = "de") {
    try {
        await typeInInput(onboarding.Screen3.idnumber, idNum, { language, print: true, });
        await typeInInput(onboarding.Screen3.TaxOffice, Taxoffice, { language, print: true, });
        await typeInInput(onboarding.Screen3.TaxNumber, TaxNum, { language, print: true, });
        await typeInInput(onboarding.Screen3.Denomination, denomination, {language, print: true,});
        await click(onboarding.continueButton);
    } catch (error) {
        console.log(error)
    }
}
async function ScreenFour(params) {
    try {

    }catch(error){
        
    }
}





if (require.main === module) {
    (async () => {
        await ScreenOne();
    })();
}

module.exports = {
    ScreenOne,
};
