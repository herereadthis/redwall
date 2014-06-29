(function() {
    requirejs.config({
        paths: {
            "ColorTuner": "color_tuner",
            "SocialFu": "social_fu",
            "Analytics": "analytics",
            "CodeFooter": "code_footer",
            "ImageExpander": "image_expander",
            "jquery": '../components/jquery/dist/jquery.min'
        }
    });
    require(["jquery", "ColorTuner", "SocialFu", "Analytics", "CodeFooter", "ImageExpander"], function($, ColorTuner, SocialFu, Analytics, CodeFooter, ImageExpander) {
        // if (Modernizr.touch === false) {
        //       HeadMore.init();
        // }
        ColorTuner.init();
        SocialFu.init();
        CodeFooter.init();
        ImageExpander.init();
        return Analytics.track();
    });
}).call(this);
