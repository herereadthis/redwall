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
            "Analytics": "analytics",
            jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min', "lib/jquery.min"]
        }
    });
    require(["jquery", "ColorTuner", "Analytics"], function($, ColorTuner, Analytics) {
        // if (Modernizr.touch === false) {
        //       HeadMore.init();
        // }
        ColorTuner.init();
        return Analytics.track();
    });
}).call(this);
