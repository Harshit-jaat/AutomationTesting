const { initDriver,getDriver, quitDriver } = require("../../utils/helpers");
const { click,typeInInput} = require("../../utils/mainfunction"); 
const {clickContinue,clickBack} = require("../../utils/commonfunction");
const {enablePlayStore,disablePlayStore} = require("../../utils/ChangeCountry"); 
const { type } = require("os");
const login = require('../elements/login');

  // if `login.js` inside `elements` folder



async function loginUser(email, password, language = "de") {
  const driver = await initDriver();
  try {await typeInInput(login.email, email, { language });
  await typeInInput(login.password, password, { language });
  await click(login.loginButton, { language });
    
  
}catch(error){
  console.log(error);
} finally {
    await quitDriver();
  }

}
if (require.main === module) {
  (async () => {

await loginUser("ctest@dev.in", "123456"); 
  })();
}

module.exports = {
  loginUser
};