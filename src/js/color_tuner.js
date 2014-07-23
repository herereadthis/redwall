// Generated by CoffeeScript 1.3.3
(function() {

  define(function(require) {
    var $, exports, gVars, hextToRgb, makeItHappen, makeShape, moduleName;
    $ = require("jquery");
    exports = {};
    moduleName = "color_tuner";
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
            hexBegin = $this.data('color-begin'),
            hexEnd = $this.data('color-end'),
            letters = $this.text(),
            letterCount, lettersWithColors, letterArray = [],
            _i, _len,
            increment, diffR, diffG, diffB;
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
        colors.diff = {
            r: colors.end.r - colors.begin.r,
            g: colors.end.g - colors.begin.g,
            b: colors.end.b - colors.begin.b
        };  
        letterArray = letters.split('');

        for (_i = 0, _len = letterArray.length; _i < _len; _i++) {
            increment = _i / (letterArray.length - 1);
            diffR = Math.round(colors.begin.r + increment * colors.diff.r);
            diffG = Math.round(colors.begin.g + increment * colors.diff.g);
            diffB = Math.round(colors.begin.b + increment * colors.diff.b);
            letterArray[_i] = '<span style="color: rgb(' + diffR + ',' + diffG + ',' + diffB + ');">' + letterArray[_i] + '</span>';
        }
        lettersWithColors = letterArray.join('');
        $this.html(lettersWithColors);

        // console.log(lettersWithColors);
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
