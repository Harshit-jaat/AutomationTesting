module.exports = {
 
    Filter4 :{
        uiauto : 'new UiSelector().description("4 | Lower Primary School")',
        path : '//android.view.ViewGroup[@content-desc="4 | Lower Primary School"]',
    },
    Filter5 : {
        uiauto : 'new UiSelector().description("5 | Lower Primary School")',
        path : '//android.view.ViewGroup[@content-desc="5 | Lower Primary School"]'

    },
    Fiter6 : {
        uiauto : 'new UiSelector().description("6 | Upper Primary School")',
        path : '//android.view.ViewGroup[@content-desc="6 | Upper Primary School"]'
    },
    Filter7 : {
        uiauto :'new UiSelector().description("7 | Upper Primary School")',
        path : '//android.view.ViewGroup[@content-desc="7 | Upper Primary School"]'
    },
    Filter8 : {
        uiauto : 'new UiSelector().description("8 | Upper Primary School")',
        path :'//android.view.ViewGroup[@content-desc="8 | Upper Primary School"]'
    },
    Filter9 : {
        uiauto : 'new UiSelector().description("9 | Lower Secondary School")',
       path : '//android.view.ViewGroup[@content-desc="9 | Lower Secondary School"]'
   },
   crossBuutton : {
    uiauto : 'new UiSelector().className("android.view.ViewGroup").instance(9)',
    path : '//android.widget.ScrollView[@content-desc="select-grade-container"]/android.view.ViewGroup/android.view.ViewGroup[1]'

   }

}