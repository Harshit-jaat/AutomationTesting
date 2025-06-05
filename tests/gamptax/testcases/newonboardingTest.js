const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");

const { loginUser, loginAdvisor } = require("./gamptest");

const login = require("../elements/login");
const onboarding = require("../elements/onboarding");

const { type } = require("os");
const { error } = require("console");
const { on } = require("events");
const { futimesSync } = require("fs");

const { faker } = require("@faker-js/faker");

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
const randomwords = faker.word.words();
const intAccount = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();
const cost = faker.number.float();





async function RegisterAsPrivateUser(language = "de") {
     await getDriver();
await loginUser("testautothree@dev.in", "123456");

    try {
     const el1 = await driver.$("id:android:id/button1");
        await click(onboarding.Screen1.companyType, {language});
        await click(onboarding.Screen1.privateperson, {language});
        await typeInInput(onboarding.Screen1.firstName, firstname, {language});
        await typeInInput(onboarding.Screen1.lastName, lastname, {language});
        await click(onboarding.Screen1.DOB, {language});
        console.log("✅✅✅")
        await el1.click();
        console.log("123✅✅✅")
        console.log("✅✅✅456")
        await click(onboarding.Screen1.maritalStatus, {language});
        await click(onboarding.Screen1.maritalStatus.married);
        await click(onboarding.continueButton, {language});
        console.log("✅✅✅✅First Screen Completed")

    } catch (error) {
        console.log(error)
    }
}
async function ContactInfo(language = "de") {
    await getDriver();
    try {
        await typeInInput(onboarding.Screen2.Email, email, { language, });
        await typeInInput(onboarding.Screen2.mobileNo, mobile, { language, });
        await typeInInput(onboarding.Screen2.telephoneNo, telephone, { language, });
        await typeInInput(onboarding.Screen2.street, street, { language, });
        await typeInInput(onboarding.Screen2.town, town, { language, });
        await typeInInput(onboarding.Screen2.postalCode, postalcode, { language, });
        const el1 = await driver.$('-android uiautomator:new UiSelector().text("").instance(0)');
        await el1.click();
        await click(onboarding.Screen2.usecamera, { language, });
        const elone = await driver.$("accessibility id:Take photo. Button. Double-tap to take a photo. Double-tap and hold to take burst photos");
        await elone.click();
        const el2 = await driver.$("id:com.android.camera:id/done_button");
        await el2.click();
        const el3 = await driver.$("id:com.agp.app:id/crop_image_menu_crop");
        await el3.click();
        await el1.click();
        await click(onboarding.Screen2.usecamera, { language, });
        await elone.click();
        await el2.click();
        await el3.click();
        await click(onboarding.continueButton);
        console.log("✅✅✅✅Screen 2 Completed")



    } catch (error) {
        console.log(error)
    }
}

async function TaxInfo(language = "de") {
    await getDriver();
    try {
        await typeInInput(onboarding.Screen3.idnumber, idNum, { language, });
        await typeInInput(onboarding.Screen3.TaxOffice, Taxoffice, { language, });
        await typeInInput(onboarding.Screen3.TaxNumber, TaxNum, { language, });
        await typeInInput(onboarding.Screen3.Denomination, denomination, { language, });
        await click(onboarding.continueButton);
        console.log("✅✅✅✅Second 3 Completed")
    } catch (error) {
        console.log(error)
    }
}
async function SpouseInfo(language = "de") {
    await getDriver();
    try {
        await typeInInput(onboarding.Screen4.spouseFirstName, firstname, { language, });
        await typeInInput(onboarding.Screen4.spouseLastName, lastname, { language, });
        await click(onboarding.Screen4.spouseDOB, { language });
        await ok.click();
        await typeInInput(onboarding.Screen4.spouseIdentificationNum, idNum, { language, });
        await typeInInput(onboarding.Screen4.spouseDenomination, randomwords, { language });
        await click(onboarding.Screen4.spouseGender, { language });
        await click(onboarding.Screen4.spouseGender.male, { language });
        await typeInInput(onboarding.Screen4.spouseTaxNum, TaxNum, { language });
        await click(onboarding.continueButton);
        console.log("✅✅✅Screen 4 Completed");
    }
    catch (error) {
        console.log(error);
    }
}
async function ChildInfo(language = "de"){
     await getDriver();
    try{
await typeInInput(onboarding.Screen5.childFirstName, firstname, {   language });
    await typeInInput(onboarding.Screen5.childLastName, lastname, { language });
    await typeInInput(onboarding.Screen5.ChildIdNumber, idNum, { language });
    await click(onboarding.Screen5.childDOB);
    await ok.click();
    await click(onboarding.Screen5.childGender, { language });
    await click(onboarding.Screen5.childGender.male, { language });
    await click(onboarding.continueButton);
    console.log("✅✅✅Screen 5 Completed");

    }
    catch(error){
        console.log(error);
    }
}
async function Bankdetails(language = "de") {
     await getDriver();
    try {
        await typeInInput(onboarding.Screen6.accountHolderName, firstname, { language, });
        await typeInInput(onboarding.Screen6.bankName, randomwords, { language });
        await typeInInput(onboarding.Screen6.internationalBankAccount, intAccount, { language });
        await click(onboarding.Screen6.directDebit, { language });
        await click(onboarding.Screen6.directDebit.No, { language });
        await click(onboarding.continueButton);
        console.log("✅✅✅Screen 6 Completed");

    } catch (error) {
        console.log(error)
    }
}
async function companyaddress(language = "de") {
     await getDriver();
    try {
        await typeInInput(onboarding.Screen7.companyType, randomwords, { language });
        await typeInInput(onboarding.Screen7.corporteObject, randomwords, { language });
        await typeInInput(onboarding.Screen7.vatNum, idNum, { language });
        await click(onboarding.Screen7.foundationDate);
        await ok.click();
        console.log("✅✅✅Screen 7 Completed");

    } catch (error) {
        console.log(error)
    }
}
async function companydetails(language = "de") {
     await getDriver();
    try {
        await typeInInput(onboarding.Screen8.billingState, randomwords, { language })
        await click(onboarding.continueButton);
        console.log("✅✅✅Screen 8 Completed");

    } catch (error) {

    }

}
async function legalRepresentative(language = "de") {
     await getDriver();
    try {
        await typeInInput(onboarding.Screen9.legalrepFirstName, firstname, { language, });
        await typeInInput(onboarding.Screen9.legalrepLastName, lastname, { language, });
        await typeInInput(onboarding.Screen9.identificationNum, idNum, { language, });
        await typeInInput(onboarding.Screen9.emailAddress, email, { language });
        await typeInInput(onboarding.Screen9.telephoneNum, telephone, { language });
        await click(onboarding.Screen9.DobSigning, { language });
        await ok.click();
        await click(onboarding.continueButton);
        console.log("✅✅✅Screen 9 Completed");

    } catch (error) {
        console.log(error);
    }
}

async function Offercreation(){
     await getDriver();
    try{
        await typeInInput(onboarding.Screen10.salesperYear, intAccount,{language});
        await typeInInput(onboarding.Screen10.offerCreation, intAccount, {language});
        await typeInInput(onboarding.Screen10.TotalAssets, intAccount, {language});
        await typeInInput(onboarding.Screen10.NoEmployess, intAccount,{language});
        await click(onboarding.continueButton);
        console.log("✅✅✅Screen 10 Completed");
        
    }
    catch(error){
        console.log(error)
    }
}


async function Onboarding1() {
    const driver = await initDriver();
    try{
 
await RegisterAsPrivateUser();
await ContactInfo();
await click(onboarding.continueButton); // Tax Information Screen 
await click(onboarding.continueButton); // Spouse Details Screen 
await click(onboarding.continueButton); // Children Details Screen
await click(onboarding.continueButton); // Bank Details 
await click(onboarding.continueButton);// Legal Representative




}catch(error){
        console.log(error);
    }
    
}




if (require.main === module) {
    (async () => {
       await Onboarding1();
        
    })();
}

module.exports = {
    RegisterAsPrivateUser,
    ContactInfo,
    TaxInfo,
    SpouseInfo,
    ChildInfo,
    Bankdetails,
    companyaddress,
    companydetails,
    legalRepresentative,
    Offercreation,
    Onboarding1


};
