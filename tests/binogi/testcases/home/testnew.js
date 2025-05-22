const { initDriver,getDriver, quitDriver } = require("../../../utils/helpers");
const { click,typeInInput} = require("../../../utils/mainfunction"); 
const {clickContinue,clickBack} = require("../../../utils/commonfunction");
const {enablePlayStore,disablePlayStore} = require("../../../utils/ChangeCountry"); 



const intro = require("../../elements/onboarding/intro");
const role = require("../../elements/onboarding/role");
const school = require("../../elements/onboarding/school");


async function StudentOnboarding() {
    const driver = await initDriver();
    await disablePlayStore();

  try {
    await click(intro.letsgo,{ print : true});
    await click(role.student,{print:true});
    clickContinue();
    await click(school.skip,{delay: 5000});
    await click("LOWER PRIMARY SCHOOL", {print : true});
    await click("4", {print :true});
    clickContinue();
    await click("MATHEMATICS", {print : true});
    clickContinue();
    await enablePlayStore();
  } catch (error) {
    console.error(error);
  } finally {
    await quitDriver();
    await enablePlayStore();
  }
}

async function GuardianOnboarding() {
  await initDriver();


  try {
     await click(intro.letsgo,{ print : true});
    await click(role.guardian,{print:true});
    clickContinue();
    await click(school.skip,{delay: 5000});
    await click("UPPER PRIMARY SCHOOL");
    await click("7");
    clickContinue();
    await click("BIOLOGY");
    clickContinue();
    
  } catch (error) {
    console.error(error);
  }
  finally {
    await quitDriver();
  }
  
}

async function TeacherOnboarding(){
  await initDriver;
  try {

  await click(intro.letsgo, {print : true});

    
  } catch (error) {
    
  }
}


if (require.main === module) {
  (async () => {
   await GuardianOnboarding();
    await StudentOnboarding();
   
  })();
}

module.exports = {
  home_bottom_bar_clicks,
};