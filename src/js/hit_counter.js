(function() {
    define(['jquery', 'PageStats'],
        function($, PageStats) {
        var exports, gVars, makeItHappen, dVars, moduleName, makeNumbers, 
            addNumberCell, canvasNum, polyDraw;
        exports = {};
        gVars = {
            figures: 6
        };
        dVars= {};
        moduleName = 'hit_counter';
        _window = $(window);
        polyDraw = function(context,polyArray, color) {
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
        arrayCheck = function(testArray, hitDigit, colors) {
            if (testArray.indexOf(hitDigit) === -1) {
                return colors.off;
            }
            else {
                return colors.on;
            }
        };
        canvasNum = function($this, hitDigit) {

            var colors = {
                on: "rgba(0,255,0,1)",
                off: "rgba(0,255,0,0.15)"
            }

            var canvas,
                context, cArray, shapeArray;

            cArray = {
                tb: [0,2,3,5,6,7,8,9],
                mb: [2,3,4,5,6,8,9],
                bb: [0,2,3,5,6,8],
                tl: [0,4,5,6,8,9],
                tr: [0,1,2,3,4,7,8,9],
                bl: [0,2,6,8],
                br: [0,1,3,4,5,6,7,8,9]
            }
            sArray = {
                tb: [6,4, 10,0, 30,0, 34,4, 30,8, 10,8],
                mb: [6,36, 10,32, 30,32, 34,36, 30,40, 10,40],
                bb: [6,68, 10,64, 30,64, 34,68, 30,72, 10,72],
                tl: [0,10, 4,6, 8,10, 8,30, 4,34, 0,30],
                tr: [32,10, 36,6, 40,10, 40,30, 36,34, 32,30],
                bl: [0,42, 4,38, 8,42, 8,62, 4,66, 0,62],
                br: [32,42, 36,38, 40,42, 40,62, 36,66, 32,62]
            }
                
            canvas = document.createElement("canvas");
            canvas.width = 40;
            canvas.height = 72;

            topBar = canvas.getContext("2d");
            tbColor = arrayCheck(cArray.tb, hitDigit, colors);
            polyDraw(topBar, sArray.tb, tbColor);

            midBar = canvas.getContext("2d");
            mbColor = arrayCheck(cArray.mb, hitDigit, colors);
            polyDraw(midBar, sArray.mb, mbColor);

            bottomBar = canvas.getContext("2d");
            bbColor = arrayCheck(cArray.bb, hitDigit, colors);
            polyDraw(bottomBar, sArray.bb, bbColor);

            topLeft = canvas.getContext("2d");
            tlColor = arrayCheck(cArray.tl, hitDigit, colors);
            polyDraw(topLeft, sArray.tl, tlColor);

            topRight = canvas.getContext("2d");
            trColor = arrayCheck(cArray.tr, hitDigit, colors);
            polyDraw(topRight, sArray.tr, trColor);

            bottomLeft = canvas.getContext("2d");
            blColor = arrayCheck(cArray.bl, hitDigit, colors);
            polyDraw(bottomLeft, sArray.bl, blColor);

            bottomRight = canvas.getContext("2d");
            brColor = arrayCheck(cArray.br, hitDigit, colors);
            polyDraw(bottomRight, sArray.br, brColor);




            return $this.css({
                "background-image": "url(" + (canvas.toDataURL("image/png")) + ")"
            });


        };
        addNumberCell = function($this, placeNumber) {
            var placeNumberClass = 'counter_digit_' + placeNumber;
            $counterContainer = $this.find('#' + moduleName);
            var hitNum = dVars.hitArray;
            $counterContainer.prepend($('<div />').addClass(placeNumberClass).
                attr('data-hit-digit', 0));
        };
        makeNumbers = function($this, pageHits) {
            var _i, _len, pageHits;
            _len = dVars.figures;
            for (_i = 0; _i < _len; _i++) {
                addNumberCell($this, _i);
            }
        };
        makeItHappen = function($this) {
            dVars.figures = parseInt($this.data('hit-counter-figures'), 10) || gVars.figures;
            var canonical = $('[rel="canonical"]').attr('href');
            var jsonFile = 'http://redwall.herereadthis.com/api/page_stats/?url=' + canonical;
            makeNumbers($this, dVars.figures);
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
