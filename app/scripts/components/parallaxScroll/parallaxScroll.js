'use strict';

// The Parallax Scroller
// takes your background and allows it scroll relative to window scroll

// Your container must contain the directive
//      data-parallax-scroll
// You can set the relative scrolling with attribute
//      [data-parallax-speed="NUMBER"]
// Where number is expressed as a percentage
// Note that negativ numbers are allowed and create an awesome dizzying effect.
// 0 = fixed to window, and 100 = fixed to scroll

angular.module('redwallApp')
    .directive('parallaxScroll', ['$window', function($window) {
        // window.console.log($window.width());
        return {
            scope: {
                parallaxSpeed: '='
            },
            link: function(scope, element) {
                scope.parallaxSpeed = scope.parallaxSpeed || 50;

                var w, offsetCoords, topOffset;

                w = angular.element($window);

                scope.bgPosition = function() {
                    var bgPosition, _i;
                    bgPosition = element.css('background-position').split(' ');

                    // you can state background position as one value that doubles for x/y.
                    // if so, make both values equal.
                    if (bgPosition.length === 1) {
                        bgPosition[1] = bgPosition[0];
                    }
                    // it should grab top|center|etc as percentages, but we'll force it.
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
                    return bgPosition;
                };

                scope.bgParam = {                
                    bgPosition: scope.bgPosition(),
                    parallaxSpeed: scope.parallaxSpeed
                }

                // we only want the y-offset
                offsetCoords = element.offset();
                topOffset = offsetCoords.top;

                w.on('scroll', function() {
                    var scrollSpeed, yPosition, newBgPosition;

                    // If this section is in view
                    if ( (w.scrollTop() + w.height()) > (topOffset) &&
                        ( (topOffset + element.height()) > element.scrollTop() ) ) {

                        // scroll speed is a percentage of the actual scrolling
                        scrollSpeed = scope.bgParam.parallaxSpeed / 100;

                        // y-position of background position
                        yPosition = -1 * Math.round(w.scrollTop() * scrollSpeed);

                        // combine exising x-position and y-position of background-position
                        newBgPosition = scope.bgParam.bgPosition[0] + ' ' + yPosition + 'px';
                        // console.log(bgParam.parallaxSpeed, $window.scrollTop(), yPosition);
                        // set it as css
                        element.css({
                            backgroundPosition: newBgPosition
                        });
                    }
                });
            }
        };
    }]);