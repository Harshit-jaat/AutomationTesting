const { remote } = require("webdriverio");
const path = require("path");

// Appium config
const appiumConfig = require(path.resolve(__dirname, "../../../../config/appium.config"));

// Element selectors
const onboardingIntro = require(path.resolve(__dirname, "../../elements/onboarding/onboardingintro"));
const onboardingRole = require(path.resolve(__dirname, "../../elements/onboarding/onboardingrole"));
const onboardingGrade = require(path.resolve(__dirname, "../../elements/onboarding/onboardinggrade/india"));
const onboardingSubject = require(path.resolve(__dirname, "../../elements/onboarding/onboardingsubject"));

async function runOnboardingTestForRole(role) {
    console.log(`📂 Using APK: ${appiumConfig.capabilities["appium:app"]}`);
    console.log(`🚀 Running Binogi Onboarding Test as: ${role.toUpperCase()}`);

    const driver = await remote({
        ...appiumConfig.server,
        capabilities: {
            alwaysMatch: appiumConfig.capabilities,
            firstMatch: [{}],
        },
    });

    try {
        // Step 1: Handle Allow Pop-up & Let's Go
        const allowPopup = await driver.$(onboardingIntro.allowpopup.path);
        if (await allowPopup.isExisting()) {
            console.log("✅ Allow Pop-up Detected!");
            await driver.$(onboardingIntro.allow.path).then(el => el.click());
            console.log("✅ Clicked Allow");
        }

        await driver.$(onboardingIntro.letsgo.path).then(el => el.click());
        console.log("✅ Clicked Let's Go");

        // Step 2: Select Role
        const roleSelector = onboardingRole[role.toLowerCase()];
        if (!roleSelector) throw new Error(`❌ Unknown role: ${role}`);

        await driver.$(roleSelector.path).then(el => el.click());
        console.log(`✅ Selected Role: ${role}`);

        await driver.$(onboardingRole.continue.path).then(el => el.click());
        console.log("✅ Clicked Continue after role selection");

        // Step 3: Grade
        await driver.$(onboardingGrade.lowersecondaryschool.path).then(el => el.click());
        console.log("✅ Clicked Lower Secondary School");

        const grade9 = await driver.$(onboardingGrade.lowersecondaryschool.grades[9].path);
        if (await grade9.isExisting()) {
            await grade9.click();
            console.log("✅ Selected Grade 9");
        } else {
            console.error("❌ Grade 9 not found!");
        }

        await driver.$(onboardingGrade.continue.path).then(el => el.click());
        console.log("✅ Clicked Continue after grade selection");

        // Step 4: Subject
        const subject = onboardingSubject.subjectlist.biology;
        await driver.$(subject.path).then(el => el.click());
        console.log("✅ Selected Subject: Biology");

        await driver.$(onboardingSubject.continue.path).then(el => el.click());
        console.log("✅ Clicked Continue after subject selection");

        await driver.pause(3000);
        console.log("⏳ Waited 3 seconds before closing");

    } catch (err) {
        console.error(`❌ Test Failed for role: ${role}`, err);
    } finally {
        await driver.deleteSession();
        console.log(`✅ Session Closed for role: ${role}`);
    }
}

// Run all roles one by one
if (require.main === module) {
    (async () => {
        const roles = ["teacher", "student", "guardian"];
        const passed = [];
        const failed = [];

        for (const role of roles) {
            console.log("\n------------------------------");
            console.log(`🎯 Starting onboarding for: ${role.toUpperCase()}`);
            console.log("------------------------------");

            try {
                await runOnboardingTestForRole(role);
                passed.push(role.charAt(0).toUpperCase() + role.slice(1));
            } catch (err) {
                console.error(`❌ FAILED: ${role.toUpperCase()}`, err.message);
                failed.push(role.charAt(0).toUpperCase() + role.slice(1));
            }
        }

        // ✅ Final Summary
        console.log("\n🎯 Test Summary:");
        if (passed.length) console.log(`✅ Passed: ${passed.join(", ")}`);
        if (failed.length) console.log(`❌ Failed: ${failed.join(", ")}`);

        console.log("\n📢 ✅ All role-based onboarding tests completed!");
    })();
}

module.exports = runOnboardingTestForRole;