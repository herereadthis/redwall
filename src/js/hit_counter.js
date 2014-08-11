(function() {
    define(['jquery', 'PageStats'],
        function($, PageStats) {
        var exports, gVars, makeItHappen, dVars, moduleName, makeNumbers, 
            addNumberCell, canvasNum, polyDraw, setParentWidth;
        exports = {};
        gVars = {
            figures: 6
        };
        dVars= {};
        moduleName = 'hit_counter';
        _window = $(window);
        // checks to see if a number exists in an array.
        // return one color if true, another color if false.
        arrayCheck = function(testArray, hitDigit, colors) {
            if (testArray.indexOf(hitDigit) === -1) {
                return colors.off;
            }
            else {
                return colors.on;
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
            var canvas, colors, lcd, key, obj, cMatch;

            colors = {
                on: "rgba(0,255,0,1)",
                off: "rgba(0,255,0,0.15)"
            }
            canvas = document.createElement("canvas");
            canvas.width = 120;
            canvas.height = 240;
            // object of all the bars to make lcd numbers
            // cMatch represents when the bar is "on" for that specific number
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
            }
            // loop through lcd object
            for ( key in lcd) {
                // isolate the specific bar
                obj = lcd[key];
                // determine if bar is "on" or "off" color for that specific digit
                cMatch = arrayCheck(obj.cMatch, hitDigit, colors);
                // create context for canvas for the spcific bar
                obj.context = canvas.getContext("2d");
                // draw the bar
                polyDraw(obj.context, obj.poly, cMatch);
            }
            
            return $this.css({
                "background-image": "url(" + (canvas.toDataURL("image/png")) + ")"
            });
        };
        // creates a block to write number, and gives ID and data attribute
        addNumberCell = function($this, placeNumber) {
            var placeNumberClass = 'counter_digit_' + placeNumber;
            $counterContainer = $this.find('#' + moduleName);
            var hitNum = dVars.hitArray;
            $counterContainer.prepend($('<div />').addClass(placeNumberClass).
                attr('data-hit-digit', 0));
        };
        // adds blocks to container based on specified number
        makeNumbers = function($this, pageHits) {
            var _i, _len, pageHits;
            _len = dVars.figures;
            for (_i = 0; _i < _len; _i++) {
                addNumberCell($this, _i);
            }
        };
        // sets width of hit counter box to prevent shrinkage
        setParentWidth = function($this, figures) {
            // var containerWidth, cellWidth;
            var containerWidth = 0;
            $this.find('[data-hit-digit]').each(function() {
                containerWidth += $(this).outerWidth();
            });

            // containerWidth = $this.find('[data-hit-digit]').outerWidth() * figures;
            $('#hit_counter').width(containerWidth);
        };
        makeItHappen = function($this) {
            dVars.figures = parseInt($this.data('hit-counter-figures'), 10) || gVars.figures;
            var canonical = $('[rel="canonical"]').attr('href');
            var jsonFile = 'http://redwall.herereadthis.com/api/page_stats/?url=' + canonical;
            makeNumbers($this, dVars.figures);
            setParentWidth($this, dVars.figures);
            $.ajax({
                url: jsonFile,
                type: 'get',
                dataType: 'json'
            }).done(function(data) {
                dVars.pageHits = parseInt(data.page_hits, 10);
                dVars.hitString = dVars.pageHits.toString();
                dVars.hitSize = dVars.hitString.length;
                dVars.hitArray = dVars.hitString.split('');
                for (num in dVars.hitArray) {
                    dVars.hitArray[num] = parseInt(dVars.hitArray[num], 10);
                }
                // console.log(dVars.hitArray.length);
                dVars.hitArray.reverse();
                $counterContainer = $this.find('#' + moduleName);
                for (num in dVars.hitArray) {
                var placeNumberClass = '.counter_digit_' + num;
                    $counterContainer.find(placeNumberClass).
                    attr('data-hit-digit', dVars.hitArray[num]);
                }
                var hitDigit;
                $counterContainer.find('div').each(function(index, element) {
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
                element = $("body").find("[data-module=\"" + moduleName + "\"]");
                return element.each(function() {
                    return makeItHappen($(this));
                });
            }
        };
        return exports;
    });

}).call(this);
