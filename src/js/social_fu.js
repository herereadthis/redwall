(function() {

    define(['jquery'], function($) {
        var exports, makeItHappen, moduleName;
        $ = require('jquery');
        exports = {};
        moduleName = 'social_fu';
        makeItHappen = function($this) {
            $this.children().each(function() {
                var linkHref = $(this).find('a').attr('href'),
                    linkTitle = $(this).find('a').attr('title');
                $(this).children('span').attr({
                    'title': linkTitle
                });
                $(this).children('span').on({
                    click: function() {
                        window.location.href = linkHref;
                    },
                    mouseenter: function() {
                    },
                    mouseleave: function() {
                    }
                });
            });
        };
        exports.init = function($this) {
            var element;
            if ($this !== void 0) {
                return makeItHappen($this);
            }
            else {
                element = $('body').find('[data-module=\"' + moduleName + '\"]');
                return element.each(function() {
                    return makeItHappen($(this));
                });
            }
        };
        return exports;
    });

}).call(this);
