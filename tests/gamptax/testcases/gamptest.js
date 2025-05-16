const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");
const { type } = require("os");
const login = require('../elements/login');

// if `login.js` inside `elements` folder



async function loginUser(email, password, language = "de") {
  const driver = await initDriver();

  try {
    await typeInInput(login.email, email, { language, print: true });
    await typeInInput(login.password, password, { language, print: true });
    await click(login.loginButton, { language, print: true });
    await logout(driver);
    await click(login.logout, {language, print : true});
    await driver.pause();
    




  } catch (error) {
    console.log(error);
  } finally {
    await quitDriver();
  }

}


async function loginAdvisor(email, password, language = "de") {
  const driver = await initDriver();
  try {
    await click(login.selectAdvisor, { language, print: true },);
    await typeInInput(login.email, email, { language, print: true });
    await typeInInput(login.password, password, { language, print: true });
    await click(login.advisorLoginButton, { language, print: true });



  } catch (error) {
    console.log(error);
  } finally {
    await quitDriver();
  }

}
async function logout(driver) {

  try {
    const el2 = await driver.$("-android uiautomator:new UiSelector().text(\"\")");
    await el2.click({print:true});
    
    
  }
  catch (error) {
    console.log(error);
  }


}

// async function menu() {
//   const menu = await $(`android=new UiSelector().text("")`);
//   await click(menu);

// }

if (require.main === module) {
  (async () => {

    await loginUser("ctest@dev.in", "123456");
    await loginAdvisor("kuro@dev.in", "123456");
  })();
}

module.exports = {
  loginUser,
  loginAdvisor
};