const { initDriver, getDriver, quitDriver } = require("../../utils/helpers");
const { click, typeInInput } = require("../../utils/mainfunction");
const { clickContinue, clickBack } = require("../../utils/commonfunction");
const { enablePlayStore, disablePlayStore } = require("../../utils/ChangeCountry");
const { type } = require("os");
const login = require('../elements/login');
const onboarding = require('../elements/onboarding')
const { loginUser, loginAdvisor } = require("./gamptest");
const { error } = require("console");

async function OnboardingTest() {
    const driver = await initDriver();
    try {
        await loginUser("testuser@dev.in", "123456");


    }
    catch (error) {
        console.log(error);
    }

    if (require.main === module) {
  (async () => {

    await OnboardingTest();
  })();
}

}
module.exports = {
    OnboardingTest
};