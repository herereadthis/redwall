(function() {
    'use strict';
    define(['jquery'], function($) {
        // global variables
        var exports, gVars, dVars, moduleName, lcd,
        // methods
            makeItHappen, makeNumbers, canvasNum, polyDraw, setParentWidth,
            arrayCheck;
        exports = {};
        gVars = {
            figures: 6,
            colorOn: 'rgba(0,255,0,1)',
            colorOff: 'rgba(0,255,0,0.18)',
            cWidth: 120,
            cHeight: 240
        };
        dVars= {};
        moduleName = 'hit_counter';
        // object of all the bars to make lcd numbers
        // cMatch represents when the bar is 'on' for that specific number
        // poly is the shape of the bar
        lcd = {
            // top horizontal bar
            tb: {
                cMatch: [0,2,3,5,6,7,8,9],
                poly: [18,12, 30,0, 90,0, 102,12, 90,24, 30,24]
            },
            // middle horizontal bar
            mb: {
                cMatch: [2,3,4,5,6,8,9],
                poly: [18,108, 30,96, 90,96, 102,108, 90,120, 30,120]
            },
            // bottom horizontal bar
            bb: {
                cMatch: [0,2,3,5,6,8],
                poly: [18,204, 30,192, 90,192, 102,204, 90,216, 30,216]  
            },
            // top left vertical bar
            tl: {
                cMatch: [0,4,5,6,8,9],
                poly: [0,30, 12,18, 24,30, 24,90, 12,102, 0,90]
            },
            // top right vertical bar
            tr: {
                cMatch: [0,1,2,3,4,7,8,9], 
                poly: [96,30, 108,18, 120,30, 120,90, 108,102, 96,90]
            },
            // bottom left vertical bar
            bl: {
                cMatch: [0,2,6,8],
                poly: [0,126, 12,114, 24,126, 24,186, 12,198, 0,186]
            },
            // bottom right vertical bar
            br: {
                cMatch: [0,1,3,4,5,6,7,8,9],
                poly: [96,126, 108,114, 120,126, 120,186, 108,198, 96,186] 
            }
        };
        // checks to see if a number exists in an array.
        // return one color if true, another color if false.
        arrayCheck = function(testArray, hitDigit) {
            if (testArray.indexOf(hitDigit) === -1) {
                return gVars.colorOff;
            }
            else {
                return gVars.colorOn;
            }
        };
        // draws a polygon, given the context, the array of coordinates, and color
        polyDraw = function(context, polyArray, color) {
            var coords;
            context.beginPath();
            context.moveTo(polyArray[0], polyArray[1]);
            for (coords = 2; coords < polyArray.length - 1; coords += 2) {
                context.lineTo(polyArray[coords], polyArray[coords + 1]);
            }
            context.closePath();
            context.fillStyle = color;
            context.fill();
        };
        canvasNum = function($this, hitDigit) {
            var canvas, key, obj, cMatch;

            canvas = document.createElement('canvas');
            canvas.width = gVars.cWidth;
            canvas.height = gVars.cHeight;

            // loop through lcd object
            for (key in lcd) {
                // isolate the specific bar
                obj = lcd[key];
                // determine if bar is 'on' or 'off' color for that specific digit
                cMatch = arrayCheck(obj.cMatch, hitDigit);
                // create context for canvas for the spcific bar
                obj.context = canvas.getContext('2d');
                // draw the bar
                polyDraw(obj.context, obj.poly, cMatch);
            }
            
            return $this.css({
                'background-image': 'url(' + (canvas.toDataURL('image/png')) + ')'
            });
        };
        // adds blocks to container based on specified number
        makeNumbers = function($this, figures) {
            var _i, placeNumberClass, hitNum;
            for (_i = 0; _i < figures; _i += 1) {
                // addNumberCell($this, _i);
                placeNumberClass = 'counter_digit_' + _i;
                hitNum = dVars.hitArray;
                $this.prepend($('<div />').addClass(placeNumberClass).
                    attr('data-hit-digit', 0));
                }
        };
        // sets width of hit counter box to prevent shrinkage
        setParentWidth = function($this) {
            var containerWidth = 0;
            $this.find('[data-hit-digit]').each(function() {
                containerWidth += $(this).outerWidth();
            });
            $this.width(containerWidth);
        };
        makeItHappen = function($this) {
            var canonical, jsonFile, placeNumberClass;
            canonical = $('[rel="canonical"]').attr('href');
            jsonFile = 'http://redwall.herereadthis.com/api/page_stats/?url=' + canonical;
            dVars.figures = parseInt($this.data('hit-counter-figures'), 10) || gVars.figures;
            makeNumbers($this, dVars.figures);
            setParentWidth($this);
            $.ajax({
                url: jsonFile,
                type: 'get',
                dataType: 'json'
            }).done(function(data) {
                dVars.pageHits = parseInt(data.page_hits, 10);
                dVars.hitString = dVars.pageHits.toString();
                dVars.hitSize = dVars.hitString.length;
                dVars.hitArray = dVars.hitString.split('');
                for (var num in dVars.hitArray) {
                    dVars.hitArray[num] = parseInt(dVars.hitArray[num], 10);
                }
                // reverse the array of numbers because it will loop starting
                // from the lowest number up.
                dVars.hitArray.reverse();
                for (var item in dVars.hitArray) {
                    placeNumberClass = '.counter_digit_' + item;
                    $this.find(placeNumberClass).data('hit-digit', dVars.hitArray[item]);
                }
                $this.find('div').each(function(index, element) {
                    canvasNum($(element), $(element).data('hit-digit'));
                });
            });
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
