(function() {
    requirejs.config({
        paths: {
            "ColorTuner": "color_tuner",
            "SocialFu": "social_fu",
            "Analytics": "analytics",
            "jquery": '../components/jquery/dist/jquery.min'
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
