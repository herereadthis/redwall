(function() {
    requirejs.config({
        // hbs: {
        //     templateExtension: 'hbs',
        //     disableI18n: true
        // },
        // shim: {
        //     "Modernizr": {
        //         deps: ["jquery"],
        //         exports: "Modernizr"
        //     }
        // },
        paths: {
            "ColorTuner": "color_tuner",
            "SocialFu": "social_fu",
            "Analytics": "analytics",
            jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min', "lib/jquery.min"]
        }
    });
    require(["jquery", "ColorTuner", "SocialFu", "Analytics"], function($, ColorTuner, SocialFu, Analytics) {
        // if (Modernizr.touch === false) {
        //       HeadMore.init();
        // }
        ColorTuner.init();
        SocialFu.init();
        return Analytics.track();
    });
}).call(this);
