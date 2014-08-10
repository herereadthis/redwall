(function() {
    define(['jquery'],
        function($) {
        var exports, gVars, makeItHappen, dVars, moduleName, makeNumbers, addNumberCell;
        exports = {};
        gVars = {
            figures: 6
        };
        dVars= {};
        moduleName = 'hit_counter';
        _window = $(window);
        addNumberCell = function ($this, placeNumber) {
            console.log(placeNumber);
            var placeNumberClass = 'counter_digit_' + placeNumber;
            $counterContainer = $this.find('#' + moduleName);
            $counterContainer.prepend($('<div />').addClass(placeNumberClass).html(0));
        };
        makeNumbers = function($this) {
            var _i, _len;
            _len = dVars.figures;
            console.log('makeNumbers');
            for (_i = 0; _i < _len; _i++) {
                addNumberCell($this, _i);
            }

        };
        makeItHappen = function($this) {
            dVars.figures = parseInt($this.data('hit-counter-figures'), 10) || gVars.figures;
            makeNumbers($this);
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
