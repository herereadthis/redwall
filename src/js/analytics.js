// Google Analytics, defined as an AMD for RequireJS

(function() {
    define(function(require) {
        var $, exports;
        $ = require("jquery");
        exports = {
            track: function(accountId) {
                var ga, s, _gaq;
                accountId = $("body").data("google-analytics") || accountId;
                _gaq = window._gaq = _gaq || [];
                ga = document.createElement("script");
                s = document.getElementsByTagName('script')[0];
                _gaq.push(['_setAccount', accountId]);
                _gaq.push(['_trackPageview']);
                console.log(_gaq);
                ga.type = "text/javascript";
                ga.async = true;
                ga.src = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + ".google-analytics.com/ga.js";
                return s.parentNode.insertBefore(ga, s);
            }
        };
        return exports;
    });
}).call(this);
