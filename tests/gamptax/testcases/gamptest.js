const { initDriver,getDriver, quitDriver } = require("../../utils/helpers");
const { click,typeInInput} = require("../../utils/mainfunction"); 
const {clickContinue,clickBack} = require("../../utils/commonfunction");
const {enablePlayStore,disablePlayStore} = require("../../utils/ChangeCountry"); 


async function demo(){
const driver = await initDriver();

try{
    // await click("Allow");
    await typeInInput("Geben Sie Ihre E-Mail-Adresse ein","ctest@dev.in");
    driver.pause(10000);
}
catch (error){
    console.log(error);
}
// finally{

// }
    
}
if (require.main === module) {
  (async () => {
//    await GuardianOnboarding();
//     await StudentOnboarding();
await demo();
   
  })();
}

module.exports = {
  demo
};