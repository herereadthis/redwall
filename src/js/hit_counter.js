(function() {
    define(['jquery', 'PageStats'],
        function($, PageStats) {
        var exports, gVars, makeItHappen, dVars, moduleName, makeNumbers, addNumberCell;
        exports = {};
        gVars = {
            figures: 6
        };
        dVars= {};
        moduleName = 'hit_counter';
        _window = $(window);
        addNumberCell = function($this, placeNumber) {
            var placeNumberClass = 'counter_digit_' + placeNumber;
            $counterContainer = $this.find('#' + moduleName);
            var hitNum = dVars.hitArray;
            $counterContainer.prepend($('<div />').addClass(placeNumberClass).html(0));
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
                console.log(dVars.hitArray.length);
                dVars.hitArray.reverse();
                $counterContainer = $this.find('#' + moduleName);
                for (num in dVars.hitArray) {
                var placeNumberClass = '.counter_digit_' + num;
                    $counterContainer.find(placeNumberClass).html(dVars.hitArray[num]);
                }
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
