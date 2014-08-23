// The Parallax Scroller
// takes your background and allows it scroll relative to window scroll

// Your container must contain data attribute
//  [data-module="parallax_scroll"]
// You can set the relative scrolling with attribute
//  [data-parallax-speed="NUMBER"]
// Where number is expressed between '0' to '100'
// 0 = fixed to window, and 100 = fixed to scroll

(function() {

  define(['jquery'], function($) {
    var exports, makeItHappen, moduleName, bgSettings, scroller, $window;
    exports = {};
    $window = $(window);
    moduleName = 'parallax_scroll';
    // options
    var defaultParallaxSpeed;
    defaultParallaxSpeed = 50;

    bgSettings = function($this) {
        var bgParam, bgPosition, parallaxSpeed, _i;

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
        for (_i = 0; _i < 2; _i += 1) {
            if (bgPosition[_i] === 'center') {
                bgPosition[_i] = '50%';
            }
            else if (bgPosition[_i] === 'top' || bgPosition[_i] === 'left') {
                bgPosition[_i] = '0%';
            }
            else if (bgPosition[_i] === 'bottom' || bgPosition[_i] === 'right') {
                bgPosition[_i] = '100%';
            }
            if ( /%/.test(bgPosition[_i]) ) {
                if (parseInt(bgPosition[_i], 10) === 0) {
                    bgPosition[_i] = 0;
                }
            }
        }

        // bunch of measures to make sure there is a data attribute for parallax-speed
        // if not, default to 50%
        if ($this.data('parallax-speed') === undefined || $this.data('parallax-speed') === '') {
            parallaxSpeed = defaultParallaxSpeed;
        }
        else {
            parallaxSpeed = $this.data('parallax-speed');
        }

        bgParam = {
            bgPosition: bgPosition,
            parallaxSpeed: parallaxSpeed
        };
        return bgParam;
    };
    scroller = function(bgParam, $this) {
        var offsetCoords, topOffset, scrollSpeed, yPosition, newBgPosition;

        // we only want the y-offset
        offsetCoords = $this.offset();
        topOffset = offsetCoords.top;

        $window.scroll(function() {
            // If this section is in view
            if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
                ( (topOffset + $this.height()) > $window.scrollTop() ) ) {

                // scroll speed is a percentage of the actual scrolling
                scrollSpeed = bgParam.parallaxSpeed / 100;
                // y-position of background position
                yPosition = -1 * Math.round($window.scrollTop() * scrollSpeed); 

                // combine exising x-position and y-position of background-position
                newBgPosition = bgParam.bgPosition[0] + ' ' + yPosition + 'px';
                // console.log(bgParam.parallaxSpeed, $window.scrollTop(), yPosition);
                // set it as css
                $this.css('background-position', newBgPosition);
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
