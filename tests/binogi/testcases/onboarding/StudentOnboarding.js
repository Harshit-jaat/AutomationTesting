const { remote } = require("webdriverio");
const path = require("path");

const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));

async function runStudentOnboarding(grade = "7", subject = "chemistry") {
    console.log(`📱 Starting onboarding for Student | Grade: ${grade} | Subject: ${subject}`);

    // Initialize WebDriver using appiumConfig
    const driver = await remote({
        ...appiumConfig.server,  // Pass the server configuration
        capabilities: { 
            alwaysMatch: appiumConfig.capabilities,
      firstMatch: [{}],
        }
    });
    console.log("✅ WebDriver initialized successfully");


    try {
        // Step 1: Pop-up
        const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
        if (await allowPopup.isExisting()) {
            await (await driver.$(onboardingIntro.allow.path)).click();
        }

        await (await driver.$(onboardingIntro.letsgo.path)).waitForDisplayed({ timeout: 5000 });
        await (await driver.$(onboardingIntro.letsgo.path)).click();

        // Step 2: Role selection - Student
        await (await driver.$(onboardingRole.student.path)).click();
        await (await driver.$(onboardingRole.continue.path)).click();

        // Step 3: Grade selection - Upper Primary
        const gradeCategory = onboardingGrade.upperprimaryschool;
        await (await driver.$(gradeCategory.path)).click();
        await (await driver.$(gradeCategory.grades[grade].path)).click();
        await (await driver.$(onboardingGrade.continue.path)).click();

        // Step 4: Subject selection
        await driver.pause(3000); // Wait for list
        await (await driver.$(onboardingSubject.subjectlist[subject].path)).click();
        await (await driver.$(onboardingSubject.continue.path)).click();

        console.log("✅ Student onboarding completed.");
    } catch (err) {
        console.error("❌ Student onboarding failed:", err.message);
        throw err;
    } finally {
        await driver.deleteSession();  // Close the session at the end
    }
}

module.exports = runStudentOnboarding;
