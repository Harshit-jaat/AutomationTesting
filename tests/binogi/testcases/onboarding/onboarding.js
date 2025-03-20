const { remote } = require("webdriverio");
const path = require("path");

// Dynamically resolve the correct path
const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));


// Load Element Selectors (Fix Paths)
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));


async function runOnboardingTest() {
    console.log(`📂 Using APK: ${appiumConfig.capabilities["appium:app"]}`);

    const driver = await remote({
        ...appiumConfig.server,
        capabilities: { alwaysMatch: appiumConfig.capabilities, firstMatch: [{}] }
    });

    try {
        console.log("🚀 Running Binogi Onboarding Test...");

        /** ✅ Step 1: Handle Allow Pop-up and Click 'Let's Go' **/
        const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
        if (await allowPopup.isExisting()) {
            console.log("✅ Allow Pop-up Detected!");
            const allowButton = await driver.$(onboardingIntro.allow.path);
            await allowButton.click();
            console.log("✅ Clicked Allow");
        }

        const letsGoButton = await driver.$(onboardingIntro.letsgo.path);
        await letsGoButton.click();
        console.log("✅ Clicked Let's Go");

        /** ✅ Step 2: Select Role (Teacher) and Continue **/
        const teacherButton = await driver.$(onboardingRole.teacher.path);
        const studentButton = await driver.$(onboardingRole.student.path);
        const guardianButton = await driver.$(onboardingRole.guardian.path);

        if (await teacherButton.isExisting() && await studentButton.isExisting() && await guardianButton.isExisting()) {
            console.log("✅ All roles are present: Student, Guardian, Teacher");
        }
        

        await teacherButton.click();
        console.log("✅ Selected Role: Teacher");

        const continueButtonRole = await driver.$(onboardingRole.continue.path);
        await continueButtonRole.click();
        console.log("✅ Clicked Continue after selecting Teacher");

       

        /** ✅ Step 3: Verify Grades and Select Lower Secondary Grade (9) **/
        const lowerSecondary = await driver.$(onboardingGrade.lowersecondaryschool.path);
        await lowerSecondary.click();
        console.log("✅ Clicked Lower Secondary School");

        const grade9 = await driver.$(onboardingGrade.lowersecondaryschool.grades[9].path);
        if (await grade9.isExisting()) {
            console.log("✅ Grade 9 is present under Lower Secondary School");
        } else {
            console.error("❌ Grade 9 is NOT present!");
        }

        await grade9.click();
        console.log("✅ Selected Grade 9");

        const continueButtonGrade = await driver.$(onboardingGrade.continue.path);
        await continueButtonGrade.click();
        console.log("✅ Clicked Continue after selecting Grade");

        /** ✅ Step 4: Verify Subjects and Select Biology **/
        const chemistry = await driver.$(onboardingSubject.subjectlist.chemistry.path);
        const biology = await driver.$(onboardingSubject.subjectlist.biology.path);
        const physics = await driver.$(onboardingSubject.subjectlist.physics.path);
        const mathematics = await driver.$(onboardingSubject.subjectlist.mathematics.path);


        if (await chemistry.isExisting() && await biology.isExisting() && await physics.isExisting() && await mathematics.isExisting()) {
            console.log("✅ All subjects are present: Chemistry, Biology, Physics, Mathematics");
        } else {
            console.error("❌ Some subjects are missing!");
        }


        await biology.click();
        console.log("✅ Selected Subject: Biology");

        const continueButtonSubject = await driver.$(onboardingSubject.continue.path);
        await continueButtonSubject.click();
        console.log("✅ Clicked Continue after selecting Subject");

        /** ✅ Step 5: Wait for 10 seconds and Close Session **/
        await driver.pause(10000);
        console.log("⏳ Waiting 10 seconds before closing...");

    } catch (error) {
        console.error("❌ Test Failed!", error);
    } finally {
        await driver.deleteSession();
        console.log("✅ Session Closed");
    }
}

// Run Test if Executed Directly
if (require.main === module) {
    runOnboardingTest();
}

module.exports = runOnboardingTest;
