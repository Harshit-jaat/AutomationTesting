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

async function OnboardingTest(language = "de") {
  await loginUser("user331@dev.in", "user331@123");
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
    const ok = await driver.$("id:android:id/button1");
    await click(onboarding.Screen1.companyType, { language, print: true });
    await click(onboarding.Screen1.privateperson, { language, print: true });
    await typeInInput(onboarding.Screen1.firstName, firstname, {
      language,
      print: true,
    });
    await typeInInput(onboarding.Screen1.lastName, lastname, {
      language,
      print: true,
    });
    await click(onboarding.Screen1.DOB, { language: "de" });
    await ok.click();
    await click(onboarding.Screen1.maritalStatus, { language, print: true });
    await click(onboarding.Screen1.maritalStatus.married);
    await click(onboarding.continueButton, { language, print: true });

    // Screen 2 :- Contact Information
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
    await typeInInput(onboarding.Screen2.postalCode, postalcode, {
      language,
      print: true,
    });

    const el1 = await driver.$(
      '-android uiautomator:new UiSelector().text("").instance(0)'
    );
    await el1.click();

    // await click(onboarding.Screen2.useGallery, { language, print: true });
    await click(onboarding.Screen2.usecamera, { language, print: true });
    const elone = await driver.$(
      "accessibility id:Take photo. Button. Double-tap to take a photo. Double-tap and hold to take burst photos"
    );
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

    console.log("✅✅87878686✅✅");
    // const firstImage = await driver.$('-android uiautomator', 'new UiSelector().resourceId("com.google.android.gms.optional_photopicker:id/icon_thumbnail").instance(0)');

    // Huawei Phone ------------------------------------------------------->>>>>>

    // const el3 = await driver.$(
    //   '-android uiautomator:new UiSelector().resourceId("com.google.android.gms.optional_photopicker:id/icon_thumbnail").instance(0)'
    // );
    // await el3.click();
    // const el2 = await driver.$("id:com.agp.app:id/crop_image_menu_crop");
    // await el2.click();
    // await el1.click();

    // await click(onboarding.Screen2.useGallery, { language, print: true });
    // await el3.click();
    // await el2.click();

    await click(onboarding.continueButton);

    // await driver.pause(2000);

    // Screen 2 :- TAX information

    const idNum = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();

    const Taxoffice = faker.person.jobTitle();
    const TaxNum = faker.number.bigInt({ min: 1000n, max: 9999n }).toString();
    const denomination = faker.number
      .bigInt({ min: 1000n, max: 9999n })
      .toString();
    console.log({ idNum, Taxoffice, TaxNum, denomination }, "✅✅✅");

    await typeInInput(onboarding.Screen3.idnumber, idNum, {
      language,
      print: true,
    });

    await typeInInput(onboarding.Screen3.TaxOffice, Taxoffice, {
      language,
      print: true,
    });
    await typeInInput(onboarding.Screen3.TaxNumber, TaxNum, {
      language,
      print: true,
    });
    await typeInInput(onboarding.Screen3.Denomination, denomination, {
      language,
      print: true,
    });
    await click(onboarding.continueButton);
    //Screen 4 :- Spouse Information
    const SpouseFirstName = faker.person.firstName();
    const SpouseLastName = faker.person.lastName();
    const SpouseIdNum = faker.number
      .bigInt({ min: 1000n, max: 9999n })
      .toString();
    const SpouseDenomination = faker.word.words();
    const spousetaxnum = faker.number
      .bigInt({ min: 1000n, max: 9999n })
      .toString();

    //Screen 4 :- Spouse Information
    await typeInInput(onboarding.Screen4.spouseFirstName, SpouseFirstName, {
      language,
      print: true,
    });
    await typeInInput(onboarding.Screen4.spouseLastName, SpouseLastName, {
      language,
      print: true,
    });
    await click(onboarding.Screen4.spouseDOB, { language });
    await ok.click();
    await typeInInput(onboarding.Screen4.spouseIdentificationNum, SpouseIdNum, {
      language,
    });
    await typeInInput(
      onboarding.Screen4.spouseDenomination,
      SpouseDenomination,
      { language }
    );
    await click(onboarding.Screen4.spouseGender, { language });
    await click(onboarding.Screen4.spouseGender.male, { language });
    await typeInInput(onboarding.Screen4.spouseTaxNum, spousetaxnum, {
      language,
    });
    await click(onboarding.continueButton);

    // Screen 5 children screen
    const childfirstname = faker.person.firstName();
    const childlastname = faker.person.lastName();
    const childIdnumber = faker.number
      .bigInt({ min: 1000n, max: 9999n })
      .toString();

    await typeInInput(onboarding.Screen5.childFirstName, childfirstname, {
      language,
    });
    await typeInInput(onboarding.Screen5.childLastName, childlastname, {
      language,
    });
    await typeInInput(onboarding.Screen5.ChildIdNumber, childIdnumber, {
      language,
    });
    await click(onboarding.Screen5.childDOB);
    await ok.click();
    await click(onboarding.Screen5.childGender, { language });
    await click(onboarding.Screen5.childGender.male, { language });
    await click(onboarding.continueButton);

    // Screen 6 > Bank Details :-
    const accountholdername = faker.person.firstName();
    const bankname = faker.word.words();
    const intAccount = faker.number
      .bigInt({ min: 1000n, max: 9999n })
      .toString();
    await typeInInput(onboarding.Screen6.accountHolderName, accountholdername, {
      language,
    });
    await typeInInput(onboarding.Screen6.bankName, bankname, { language });
    await typeInInput(onboarding.Screen6.internationalBankAccount, intAccount, {
      language,
    });
    await click(onboarding.Screen6.directDebit, { language });
    await click(onboarding.Screen6.directDebit.No, { language });
    await click(onboarding.continueButton);
    // Legal Represntative ---->
    await typeInInput(onboarding.Screen9.legalrepFirstName, firstname, {
      language,
    });
    await typeInInput(onboarding.Screen9.legalrepLastName, lastname, {
      language,
    });
    await typeInInput(onboarding.Screen9.identificationNum, idNum, {
      language,
    });
    await typeInInput(onboarding.Screen9.emailAddress, email, { language });
    await typeInInput(onboarding.Screen9.telephoneNum, telephone, { language });
    await click(onboarding.Screen9.DobSigning, { language });
    await ok.click();
    await click(onboarding.continueButton);
    // Offer creation ->
    await click(onboarding.continueButton);
  } catch (error) {
    console.log(error);
  }
}
// async function CompanyOnboardingTest(language = "de") {
//   const driver = await getDriver();

//   // Generate fake data relevant for company
//   const firstname = faker.person.firstName();
//   const lastname = faker.person.lastName();

//   const companyName = faker.company.name();
//   const companyRegNum = faker.number.bigInt({ min: 100000n, max: 999999n }).toString();
//   const taxNumber = faker.number.bigInt({ min: 1000000n, max: 9999999n }).toString();
//   const companyAddress = faker.location.streetAddress();
//   const city = faker.location.city();
//   const postalCode = faker.location.zipCode();
//   const phone = faker.phone.number();
//   const email = faker.internet.email();
// try{

// const ok = await driver.$("id:android:id/button1");
//     await click(onboarding.Screen1.companyType, { language, print: true });
//     await click(onboarding.Screen1.business,{language, print: true});
//     await typeInInput(onboarding.Screen1.firstName, firstname, {
//       language,
//       print: true,
//     });
//     await typeInInput(onboarding.Screen1.lastName, lastname, {
//       language,
//       print: true,
//     });
//     await click(onboarding.Screen1.DOB, { language: "de" });
//     await ok.click();
//     await click(onboarding.Screen1.maritalStatus, { language, print: true });
//     await click(onboarding.Screen1.maritalStatus.married);
//     await click(onboarding.continueButton, { language, print: true });

//     // Screen 2 :- Contact Information
//     await typeInInput(onboarding.Screen2.Email, email, {
//       language,
//       print: true,
//     });
//     await typeInInput(onboarding.Screen2.mobileNo, mobile, {
//       language,
//       print: true,
//     });
//     await typeInInput(onboarding.Screen2.telephoneNo, telephone, {
//       language,
//       print: true,
//     });
//     await typeInInput(onboarding.Screen2.street, street, {
//       language,
//       print: true,
//     });
//     await typeInInput(onboarding.Screen2.town, town, { language, print: true });
//     await typeInInput(onboarding.Screen2.postalCode, postalcode, {
//       language,
//       print: true,
//     });

//     const el1 = await driver.$(
//       '-android uiautomator:new UiSelector().text("").instance(0)'
//     );
//     await el1.click();

//     // await click(onboarding.Screen2.useGallery, { language, print: true });
//     await click(onboarding.Screen2.usecamera, { language, print: true });
//     const elone = await driver.$(
//       "accessibility id:Take photo. Button. Double-tap to take a photo. Double-tap and hold to take burst photos"
//     );
//     await elone.click();
//     const el2 = await driver.$("id:com.android.camera:id/done_button");
//     await el2.click();
//     const el3 = await driver.$("id:com.agp.app:id/crop_image_menu_crop");
//     await el3.click();

//     await el1.click();
//     await click(onboarding.Screen2.usecamera, { language, print: true });
//     await elone.click();
//     await el2.click();
//     await el3.click();
//       await click(onboarding.continueButton);

//  }
// catch(error){
//   console.log(error)
// }

// }

if (require.main === module) {
  (async () => {
    await OnboardingTest();
  })();
}

module.exports = {
  OnboardingTest,
};
