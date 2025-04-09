const { remote } = require("webdriverio");
const path = require("path");
const {
    clickElement,
    waitForElement,
    handleTestError
} = require("../../../utils/elementUtils");
const { 
    readExperimentVariantFromLog
 } = require("../../../utils/growthbookUtils");

const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));
const onboardingSchool = require(path.resolve(__dirname, "../../elements/onboarding/onboardingschool"));

let locationPopupShown = false;

async function runNormalOnboardingTest() {
    const driver = await remote({
        ...appiumConfig.server,
        capabilities: {
            alwaysMatch: appiumConfig.capabilities,
            firstMatch: [{}]
        }
    });

    try {
        console.log("🚀 Starting Normal Onboarding Flow");

        // Step 1: Allow pop-up and press Let's Go
        const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
        if (await allowPopup.isExisting()) {
            await clickElement(driver, onboardingIntro.allow.path);
            console.log("✅ Clicked Allow button");
        }

        await clickElement(driver, onboardingIntro.letsgo.path);
        console.log("✅ Clicked 'Let's Go'");

        // Select Role
        await driver.$(onboardingRole.teacher.path).then(el => el.click());
        await driver.$(onboardingRole.continue.path).then(el => el.click());
        console.log("✅ Selected Role: Teacher");

        const locationPopup = await driver.$(onboardingSchool.locationPrompt.path);
        if (await locationPopup.isExisting()) {
            if (!locationPopupShown) {
                await clickElement(driver, onboardingSchool.whileUsingApp.path);
                locationPopupShown = true;
                console.log("🌍 Location permission allowed");
            } else {
                throw new Error("❌ Location permission popup appeared again! It should only appear once.");
            }
        }

        console.log("🧪 Checking GrowthBook variant from logs...");
        const variant = await readExperimentVariantFromLog();
        console.log(`🧪 Experiment variant detected: ${variant}`);

        // Wait for school input
        // const schoolInputFinal = await waitForElement(driver, onboardingSchool.schoolSearchInput.path, 5000);

        if (variant === "b") {
            // Variant B should NOT show skip
            const skipExists = await driver.$(onboardingSchool.skipQuestionText.path).isExisting();
            if (skipExists) {
                throw new Error("❌ 'Skip this question' is visible but should be hidden for Variant B");
            }
            console.log("✅ Verified: 'Skip this question' is hidden for Variant B");

            await clickElement(driver, onboardingSchool.continueButton.path);
            console.log("✅ Clicked Continue on school page");

        } else {
            // Variant A or fallback shows skip
            await clickElement(driver, onboardingSchool.skipQuestionText.path);
            console.log("✅ Clicked 'Skip this question'");
        }

        

        //✅ Step 3: Select all grades dynamically
        const schoolKeys = Object.keys(onboardingGrade).filter(key => onboardingGrade[key].grades);

        for (const schoolKey of schoolKeys) {
            const school = onboardingGrade[schoolKey];
            await clickElement(driver, school.path);
            console.log(`✅ Opened ${school.text}`);

            const gradeKeys = Object.keys(school.grades);

            for (let i = 0; i < gradeKeys.length; i++) {
                const gradeKey = gradeKeys[i];

                await clickElement(driver, school.path);
                console.log(`✅ Re-opened ${school.text}`);

                await clickElement(driver, school.grades[gradeKey].path);
                console.log(`✅ Selected Grade ${gradeKey}`);

                await clickElement(driver, onboardingGrade.continue.path);
                console.log("✅ Clicked Continue after grade selection");

                if (i !== gradeKeys.length - 1 || schoolKey !== schoolKeys[schoolKeys.length - 1]) {
                    await clickElement(driver, onboardingGrade.backbutton.path);
                    console.log("🔙 Back to Grade Selection");
                }
            }
        }

        //✅ Step 4: Click all subjects
        const subjectKeys = Object.keys(onboardingSubject.subjectlist);

        for (const subjectKey of subjectKeys) {
            const subject = onboardingSubject.subjectlist[subjectKey];
            const el = await waitForElement(driver, subject.path);
            if (await el.isExisting()) {
                await clickElement(driver, subject.path);
                console.log(`✅ Selected Subject: ${subjectKey.toUpperCase()}`);
                await driver.pause(300);
            }
        }

        await clickElement(driver, onboardingSubject.continue.path);
        console.log("✅ Clicked Continue after subject selection");

        await driver.pause(3000);
        console.log("🏠 Reached Home Screen");

    } catch (error) {
        handleTestError(error, "Normal Onboarding Test");
    }
     finally {
        await driver.deleteSession();
        console.log("✅ Session Closed");
    }
}

// Run if executed directly
if (require.main === module) {
    runNormalOnboardingTest();
}

module.exports = runNormalOnboardingTest;
