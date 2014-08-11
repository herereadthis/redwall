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
        arrayCheck = function(testArray, hitDigit, colorOn, colorOff) {
            if (testArray.indexOf(hitDigit) === -1) {
                return colorOff;
            }
            else {
                return colorOn;
            }
        };
        canvasNum = function($this, hitDigit) {
            // $this.html(hitDigit);
            var colorOn, colorOff;

            colorOn = "rgba(0,255,0,1)";
            colorOff = "rgba(0,255,0,0.2)";

            var canvas,
                context, cArray;

            cArray = {
                tb: [0,2,3,5,6,7,8,9],
                mb: [2,3,4,5,6,8,9],
                bb: [0,2,3,5,6,8],
                tl: [0,4,5,6,8,9],
                tr: [0,1,2,3,4,7,8,9],
                bl: [0,2,6,8],
                br: [0,1,3,4,5,6,7,8,9]
            }
                
            canvas = document.createElement("canvas");
            canvas.width = 20;
            canvas.height = 36;

            topBar = canvas.getContext("2d");
            tbArray = [3,2, 5,0, 15,0, 17,2, 15,4, 5,4];
            tbColor = arrayCheck(cArray.tb, hitDigit, colorOn, colorOff);
            polyDraw(topBar, tbArray, tbColor);

            midBar = canvas.getContext("2d");
            mbArray = [3,18, 5,16, 15,16, 17,18, 15,20, 5,20];
            mbColor = arrayCheck(cArray.mb, hitDigit, colorOn, colorOff);
            polyDraw(midBar, mbArray, mbColor);

            bottomBar = canvas.getContext("2d");
            bbArray = [3,34, 5,32, 15,32, 17,34, 15,36, 5,36];
            bbColor = arrayCheck(cArray.bb, hitDigit, colorOn, colorOff);
            polyDraw(bottomBar, bbArray, bbColor);

            topLeft = canvas.getContext("2d");
            tlArray = [0,5, 2,3, 4,5, 4,15, 2,17, 0,15];
            tlColor = arrayCheck(cArray.tl, hitDigit, colorOn, colorOff);
            polyDraw(topLeft, tlArray, tlColor);

            topRight = canvas.getContext("2d");
            trArray = [16,5, 18,3, 20,5, 20,15, 18,17, 16,15];
            trColor = arrayCheck(cArray.tr, hitDigit, colorOn, colorOff);
            polyDraw(topRight, trArray, trColor);

            bottomLeft = canvas.getContext("2d");
            blArray = [0,21, 2,19, 4,21, 4,31, 2,33, 0,31];
            blColor = arrayCheck(cArray.bl, hitDigit, colorOn, colorOff);
            polyDraw(bottomLeft, blArray, blColor);

            bottomRight = canvas.getContext("2d");
            brArray = [16,21, 18,19, 20,21, 20,31, 18,33, 16,31];
            brColor = arrayCheck(cArray.br, hitDigit, colorOn, colorOff);
            polyDraw(bottomRight, brArray, brColor);




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
