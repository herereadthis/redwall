(function() {
    'use strict';
    define(['jquery', 'ColorShift', 'SocialFu', 'ParallaxScroll', 'HitCounter', 'RileyFu', 'BannerImage'],
        function($, ColorShift, SocialFu, ParallaxScroll, HitCounter, RileyFu, BannerImage) {
        var exports, gVars, makeItHappen, moduleName;
        exports = {};
        gVars = {};
        moduleName = 'retromator';

        makeItHappen = function() {
            // purchase.purchaseProduct();
            BannerImage.init();
            ParallaxScroll.init();
            SocialFu.init();
            ColorShift.init();
            HitCounter.init();
            RileyFu.init();
        };
        exports.init = function($this) {
            var $element;
            if ($this !== void 0) {
                return makeItHappen($this);
            }
            else {
                $element = $('[data-module="' + moduleName + '"]');
                return $element.each(function() {
                    return makeItHappen($(this));
                });
            }
            // $element = $('[data-module="' + moduleName + '"]');
            // if ($element.length > 0) {
            //     return $element.each(function() {
            //         return makeItHappen($(this));
            //     });
            // }
        };
        return exports;
    });

}).call(this);
