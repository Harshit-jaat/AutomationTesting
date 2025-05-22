const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");
const { type } = require("os");
const login = require('../elements/login');
const onboarding = require('../elements/onboarding')
const { loginUser, loginAdvisor } = require("./gamptest");
const { error } = require("console");
const { faker } = require('@faker-js/faker');
const { on } = require("events");



async function OnboardingTest(language = "de") {

  await loginUser("testuser@dev.in", "123456");
  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const email = faker.internet.email();
  const mobile = "787878789789";
  const telephone = faker.phone.imei();
  const street = faker.location.streetAddress();
  const town = faker.location.city();
  const postalcode = faker.location.zipCode();
  // console.log("✅✅✅✅✅✅✅✅");
  const driver = await getDriver();
  // console.log("✅✅✅✅✅✅✅✅");
  try {
    // console.log("✅✅✅✅✅✅✅✅");
    // console.log("Function Started");

    await click(onboarding.Screen1.companyType, { language, print: true });
    await click(onboarding.Screen1.privateperson, { language, print: true });
    await typeInInput(onboarding.Screen1.firstName, firstname, { language, print: true });
    await typeInInput(onboarding.Screen1.lastName, lastname, { language, print: true });
    await click(onboarding.Screen1.DOB, { language: "de" });
    await click(onboarding.Screen1.maritalStatus, { language, print: true });
    await click(onboarding.Screen1.maritalStatus.married);
    await click(onboarding.continueButton, { language, print: true });

    // Screen 2 :- Contact Information
    await typeInInput(onboarding.Screen2.Email, email, { language, print: true });
    await typeInInput(onboarding.Screen2.mobileNo, mobile, { language, print: true });
    await typeInInput(onboarding.Screen2.telephoneNo, telephone, { language, print: true });
    await typeInInput(onboarding.Screen2.street, street, { language, print: true });
    await typeInInput(onboarding.Screen2.town, town, { language, print: true });
    await typeInInput(onboarding.Screen2.postalCode, postalcode, { language, print: true });

    const el1 = await driver.$("-android uiautomator:new UiSelector().text(\"\").instance(0)");
    await el1.click();

    await click(onboarding.Screen2.useGallery, { language, print: true });
    console.log("✅✅87878686✅✅")
    // const firstImage = await driver.$('-android uiautomator', 'new UiSelector().resourceId("com.google.android.gms.optional_photopicker:id/icon_thumbnail").instance(0)');
    const el3 = await driver.$("-android uiautomator:new UiSelector().resourceId(\"com.google.android.gms.optional_photopicker:id/icon_thumbnail\").instance(0)");
    await el3.click();
    const el2 = await driver.$("id:com.agp.app:id/crop_image_menu_crop");
    await el2.click();
    await el1.click();

    await click(onboarding.Screen2.useGallery, { language, print: true });
    await el3.click();
    await el2.click();





    // await click(onboarding.Screen2.usecamera, { language, print: true });
    // await driver.$('id=com.huawei.camera:id/shutter_button').click();
    // await driver.$('id=com.huawei.camera:id/head_black_background').click();
    // await driver.$('id=com.agp.app:id/crop_image_menu_crop').click();
    // const firstImage = await driver.$('//android.widget.ImageView[1]');


    // await firstImage.click();
    // await driver.$('id=com.agp.app:id/crop_image_menu_crop').click()
    await click(onboarding.continueButton);



    await driver.pause(2000);


  }
  catch (error) {
    console.log(error);
  }
}
if (require.main === module) {
  (async () => {

    await OnboardingTest();
  })();
}


module.exports = {
  OnboardingTest
};