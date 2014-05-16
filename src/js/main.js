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
            "Analytics": "analytics",
            jquery: ['https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min', "lib/jquery.min"]
        }
    });
    require(["jquery", "Analytics"], function($, Analytics) {
        // if (Modernizr.touch === false) {
        //       HeadMore.init();
        // }
        // Footsie.init();
        return Analytics.track();
    });
}).call(this);
