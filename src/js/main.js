(function() {
    requirejs.config({
        paths: {
            // retro homepage
            'Retromator': 'retromator',
            "ColorTuner": "color_tuner",
            "SocialFu": "social_fu",
            "ParallaxScroll": "parallax_scroll",
            // "ParallaxScroll": "../components/greeneyes/src/js/parallax_scroll",
            // coding blog
            'CodeBlog': 'code_blog',
            "CodeFooter": "code_footer",
            "ImageExpander": "image_expander",
            // google analytics
            "Analytics": "../components/greeneyes/src/js/analytics",
            // jQuery
            "jquery": '../components/jquery/dist/jquery.min',
            // dummy modules for testing
            'purchase': 'purchase',
            'products': 'products',
            'credits': 'credits'
        }
    });
    require(['Retromator', 'CodeBlog', 'Analytics'], function(Retromator, CodeBlog, Analytics) {
        // if (Modernizr.touch === false) {
        // }
        // utilities on home page
        Retromator.init();
        // utilities on coding blog
        CodeBlog.init();
        return Analytics.track();
    });
}).call(this);
