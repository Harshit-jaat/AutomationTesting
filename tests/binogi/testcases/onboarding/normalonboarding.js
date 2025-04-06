const { remote } = require("webdriverio");
const path = require("path");
const {
    clickElement,
    waitForElement,
} = require("../../../utils/elementUtils");

const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));

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

        //✅ Step 2: Select all roles dynamically
        const roleKeys = Object.keys(onboardingRole).filter(key =>
            key !== "continue" && key !== "backbutton"
        );

        for (let i = 0; i < roleKeys.length; i++) {
            const roleKey = roleKeys[i];
            await clickElement(driver, onboardingRole[roleKey].path);
            console.log(`✅ Selected Role: ${roleKey.toUpperCase()}`);

            await clickElement(driver, onboardingRole.continue.path);
            console.log("✅ Clicked Continue after role selection");

            if (i !== roleKeys.length - 1) {
                await clickElement(driver, onboardingRole.backbutton.path);
                console.log("🔙 Back to Role Selection");
            }
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
        console.error("❌ Error during normal onboarding flow:", error.message);
    } finally {
        await driver.deleteSession();
        console.log("✅ Session Closed");
    }
}

// Run if executed directly
if (require.main === module) {
    runNormalOnboardingTest();
}

module.exports = runNormalOnboardingTest;