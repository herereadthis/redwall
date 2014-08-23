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
    'use strict';
    define(['jquery'], function($) {
        var exports, moduleName,
            hexToRgb, makeItHappen, makeShape;
        $ = require('jquery');
        exports = {};
        moduleName = 'color_tuner';
        // hexToRgb function taken from
        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        hexToRgb = function(hex) {
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
        makeShape = function($this) {
            var colors,
                hexBegin = $this.data('color-begin') ? $this.data('color-begin') : '000',
                hexEnd = $this.data('color-end') ? $this.data('color-end') : 'FFF',
                letters = $this.text(),
                lettersWithColors, letterArray = [],
                _i, _len,
                increment, diffR, diffG, diffB;
            // build array of colors, separated as RGB
            colors = {
                begin: {
                    hex: hexBegin,
                    r: hexToRgb(hexBegin).r,
                    g: hexToRgb(hexBegin).g,
                    b: hexToRgb(hexBegin).b
                },
                end: {
                    hex: hexEnd,
                    r: hexToRgb(hexEnd).r,
                    g: hexToRgb(hexEnd).g,
                    b: hexToRgb(hexEnd).b
                }
            };
            // find range between start and end of RGB values
            colors.diff = {
                r: colors.end.r - colors.begin.r,
                g: colors.end.g - colors.begin.g,
                b: colors.end.b - colors.begin.b
            };
            // split character string and build as array
            letterArray = letters.split('');

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
            $this.html(lettersWithColors);
        };
        makeItHappen = function($this) {
          return makeShape($this);
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
