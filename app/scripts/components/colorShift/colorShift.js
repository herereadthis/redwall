'use strict';

// The Color Shifter
// takes a string of characters and gives it a color range as you define them.
// Formatting.....
// 
// Required directive
//     * data-color-shift
// 
// optional data attributes
// you can define them with 3 (e.g. "F00") or 6 (e.g. "FF0000") characters
//     * data-color-begin = HEX_COLOR
//     * data-color-end = HEX_COLOR
// if you don't specify, it'll just fade from black to white
// 
// SAMPLE:
// <span
//     data-color-shift
//     data-color-begin="F00"
//     data-color-end="00F">Hello, World!</span>



angular.module('redwallApp')
    .directive('colorShift', ['$window', function($window) {
        // window.console.log($window.width());
        return {
            restrict: 'A',
            scope: {
                colorBegin: '=',
                colorEnd: '='
            },
            link: function(scope, element) {

                var hexBegin = scope.colorBegin ? scope.colorBegin : '000',
                    hexEnd = scope.colorEnd ? scope.colorEnd : 'FFF',
                    letters = element.text(),
                    letterArray = [];

                // hexToRgb function taken from
                // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
                scope.hexToRgb = function(hex) {
                    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
                    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                        return r + r + g + g + b + b;
                    });

                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result ? {
                        r: parseInt(result[1], 16),
                        g: parseInt(result[2], 16),
                        b: parseInt(result[3], 16)
                    } : null;
                };
                scope.letterColorize = function (letterArray, colors) {
                    var _i, _len,
                        increment, diffR, diffG, diffB,
                        lettersWithColors;

                    // for each letter in array...
                    for (_i = 0, _len = letterArray.length; _i < _len; _i += 1) {
                        increment = _i / (letterArray.length - 1);
                        // each RGB value gets one more increment of the diff value
                        diffR = Math.round(colors.begin.r + increment * colors.diff.r);
                        diffG = Math.round(colors.begin.g + increment * colors.diff.g);
                        diffB = Math.round(colors.begin.b + increment * colors.diff.b);
                        // output each letter wrapped with inline style of new color
                        letterArray[_i] = '<span style="color: rgb(' + diffR + ',' +
                            diffG + ',' + diffB + ');">' + letterArray[_i] + '</span>';
                    }
                    // join all the letters together, and spit out as final presentation
                    lettersWithColors = letterArray.join('');

                    return lettersWithColors
                };

                // build array of colors, separated as RGB
                scope.colors = {
                    begin: {
                        hex: hexBegin,
                        r: scope.hexToRgb(hexBegin).r,
                        g: scope.hexToRgb(hexBegin).g,
                        b: scope.hexToRgb(hexBegin).b
                    },
                    end: {
                        hex: hexEnd,
                        r: scope.hexToRgb(hexEnd).r,
                        g: scope.hexToRgb(hexEnd).g,
                        b: scope.hexToRgb(hexEnd).b
                    }
                };

                // find range between start and end of RGB values
                scope.colors.diff = {
                    r: scope.colors.end.r - scope.colors.begin.r,
                    g: scope.colors.end.g - scope.colors.begin.g,
                    b: scope.colors.end.b - scope.colors.begin.b
                };

                // split character string and build as array
                letterArray = letters.split('');
                element.html(scope.letterColorize(letterArray, scope.colors));

            }
        };
    }]);

