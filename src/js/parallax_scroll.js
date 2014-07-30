// The Color Tuner
// takes a string of characters and gives it a color range as you define them.
// Formatting.....
// 
// Required data attribute
//     * data-module = color_tuner
// 
// optional data attributes
// you can define them with 3 (e.g. "F00") or 6 (e.g. "FF0000") characters
//     * data-color-begin = HEX_COLOR
//     * data-color-end = HEX_COLOR
// 
// SAMPLE:
// <span
//     data-module="color_tuner"
//     data-color-begin="F00"
//     data-color-end="00F">Hello, World!</span>

(function() {

  define(function(require) {
    var $, exports, gVars , makeItHappen, moduleName, bgSettings, scroller, $window;
    $ = require("jquery");
    exports = {};
    $window = $(window);
    moduleName = "parallax_scroll";

    bgSettings = function($this) {

        var bgParam = {},
            bgPosition, bgRepeat, bgSize, bgImage,
            parallaxSpeed;

        // bgImage = $this.css('background-image');
        // bgSize = $this.css('background-size').split(' ');
        // bgRepeat = $this.css('background-repeat');

        bgPosition = $this.css('background-position').split(' ');
        // you can state background position as one value that doubles for x/y.
        // if so, make both values equal.
        if (bgPosition.length === 1) {
            bgPosition[1] = bgPosition[0];
        }
        // it should grab top|center|etc as percentages, but we'll force it.
        var _i, _j;

        for (_i = 0; _i < 2; _i++) {
            if (bgPosition[_i] === "center") {
                bgPosition[_i] = '50%';
            }
            else if (bgPosition[_i] === "top" || bgPosition[_i] === "left") {
                bgPosition[_i] = '0%';
            }
            else if (bgPosition[_i] === "bottom" || bgPosition[_i] === "right") {
                bgPosition[_i] = '100%';
            }
            if ( /%/.test(bgPosition[_i]) ) {
                if (parseInt(bgPosition[_i], 10) === 0) {
                    bgPosition[_i] = 0;
                }
            }
        }
        // parallax Speed is a measure of percentage. 0=fixed, 100=scroll
        parallaxSpeed = $this.data('parallax-speed') ? $this.data('parallax-speed') : 50;

        bgParam = {
            bgPosition: bgPosition,
            parallaxSpeed: parallaxSpeed
        }

        return bgParam;
    };
    scroller = function(bgParam, $this) {
        var offsetCoords, topOffset;

        offsetCoords = $this.offset(),
        topOffset = offsetCoords.top;

        $window.scroll(function() {
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                ( (topOffset + $this.height()) > $window.scrollTop() ) ) {

                console.log('in view');
            }
        });
    };
    makeItHappen = function($this) {
        var bgParam = bgSettings($this);
        scroller(bgParam, $this);
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
