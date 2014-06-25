(function() {
    requirejs.config({
        paths: {
            "ColorTuner": "color_tuner",
            "SocialFu": "social_fu",
            "Analytics": "analytics",
            "CodeFooter": "code_footer",
            "jquery": '../components/jquery/dist/jquery.min'
        }
    });
    require(["jquery", "ColorTuner", "SocialFu", "Analytics", "CodeFooter"], function($, ColorTuner, SocialFu, Analytics, CodeFooter) {
        // if (Modernizr.touch === false) {
        //       HeadMore.init();
        // }
        ColorTuner.init();
        SocialFu.init();
        CodeFooter.init();
        return Analytics.track();
    });
}).call(this);
