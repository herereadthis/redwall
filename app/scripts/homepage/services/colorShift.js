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

var colorShiftService = angular.module('colorShiftService', []);

colorShiftService.factory('colorShift', ['$sce', function ($sce) {
    var hexToRgb, letterColorize;

    // hexToRgb function taken from
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgb = function (hex) {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    letterColorize = function (letterArray, colors) {
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

        return lettersWithColors;
    };
    return {
        letters: function (params) {

            var hexBegin = params.colorBegin ? params.colorBegin : '000',
                hexEnd = params.colorEnd ? params.colorEnd : 'FFF',
                letters = params.title,
                letterArray = [],
                colorParams,
                colorShiftTitle;

            // build array of colors, separated as RGB
            colorParams = {
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
            colorParams.diff = {
                r: colorParams.end.r - colorParams.begin.r,
                g: colorParams.end.g - colorParams.begin.g,
                b: colorParams.end.b - colorParams.begin.b
            };

            // split character string and build as array
            letterArray = letters.split('');

            colorShiftTitle = $sce.trustAsHtml(letterColorize(letterArray, colorParams));

            return(colorShiftTitle);
        }
    };
}]);
