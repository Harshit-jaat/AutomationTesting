module.exports = {
    allow : {
        id : "android:id/button1",
        path : '//android.widget.Button[@resource-id="android:id/button1"]',
        uiauto : 'new UiSelector().resourceId("android:id/button1")'
    },
    dontallow : {
        id : 'android:id/button2',
        path : '//android.widget.Button[@resource-id="android:id/button2"]',
        uiauto : 'new UiSelector().resourceId("android:id/button2")'
    },
    letsgo : {
        path: '//android.view.ViewGroup[@content-desc="LET\'S GO"]/android.view.ViewGroup',
        uiauto: 'new UiSelector().description("LET\'S GO")'
    },
    login : {
        path : '//android.widget.TextView[@text="LOG IN"]',
        uiauto : 'new UiSelector().text("LOG IN")'
    },
    allowpopup : {
        text : "Allow 'Binogi' to track your activity across the apps.",
        id : 'com.binogi:id/alertTitle',
        path : '//android.widget.TextView[@resource-id="com.binogi:id/alertTitle"]',
        uiauto : 'new UiSelector().resourceId("com.binogi:id/alertTitle")'
    }



}