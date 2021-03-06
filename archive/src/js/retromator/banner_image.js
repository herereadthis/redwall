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
            $this.on('click', 'a', function (e) {
                e.preventDefault();
            });
            jsonFile = 'http://redwall.herereadthis.com/api/banner_image/?sort=hits';
            $.getJSON(jsonFile, function(data) {
                var lowestHitObject;
                lowestHitObject = data[0];

                $this.find('a').attr({
                            'title': lowestHitObject.title,
                            'href': '#'
                        }
                    ).append($('<img />'));
                $this.find('img').attr({
                    'src': lowestHitObject.thumbnail,
                    'alt': lowestHitObject.description
                });
            });
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
