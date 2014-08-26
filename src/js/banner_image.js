// Banner Image
//

(function() {
    'use strict';
    define(['jquery'], function($) {
        var exports, moduleName,
            getImage, makeItHappen;
        exports = {};
        moduleName = 'banner_image';

        getImage = function($this) {
            var jsonFile;
            jsonFile = 'http://redwall.herereadthis.com/api/banner_image/?sort=hits';
            $.getJSON(jsonFile, function(data) {
                var lowestHitObject;
                lowestHitObject = data[0];

                $this.find('a').attr({
                            'title': lowestHitObject.title,
                            'href': '#'
                        }
                    ).html($('<img />'));
                $this.find('img').attr({
                    'src': lowestHitObject.url,
                    'alt': lowestHitObject.description
                });
            });
            // window.console.log($this.html());
        };
        makeItHappen = function($this) {
            getImage($this);
        };
        exports.init = function($this) {
            var element;
            if ($this !== void 0) {
                return makeItHappen($this);
            }
            else {
                element = $('[data-module="' + moduleName + '"]');
                return element.each(function() {
                    return makeItHappen($(this));
                });
            }
        };
        return exports;
    });
}).call(this);
