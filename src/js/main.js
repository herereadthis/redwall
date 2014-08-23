(function() {
    'use strict';
    require.config({
        paths: {
            // retro homepage
            'Retromator': 'retromator',
            'ColorTuner': 'color_tuner',
            'HitCounter': 'hit_counter',
            'RileyFu': 'riley_fu',
            'SocialFu': 'social_fu',
            // coding blog
            'CodeBlog': 'code_blog',
            'CodeFooter': 'code_footer',
            'ImageExpander': 'image_expander',
            // shared stuffs! 
            'PageStats': 'page_stats',
            // 'ParallaxScroll': 'parallax_scroll',
            'ParallaxScroll': '../components/greeneyes/src/js/parallax_scroll',
            // google analytics
            'Analytics': '../components/greeneyes/src/js/google_analytics_universal',
            // jQuery
            'jquery': '../components/jquery/dist/jquery.min',
            // dummy modules for testing
            'purchase': 'purchase',
            'products': 'products',
            'credits': 'credits'
        }
    });
    require(['Retromator', 'CodeBlog', 'PageStats', 'Analytics'],
        function(Retromator, CodeBlog, PageStats, Analytics) {
        // if (Modernizr.touch === false) {
        // }
        // utilities on home page
        Retromator.init();
        // utilities on coding blog
        CodeBlog.init();
        PageStats.init();
        return Analytics.track();
    });
}).call(this);
