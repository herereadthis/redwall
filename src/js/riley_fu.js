(function() {
    define(['jquery'], function($) {
        var exports, rileyColors, gVars, moduleName, rileyColumns, rileyRect,
            $window, $document,
            makeItHappen, MakeShape, makeRileyRect, drawCanvas, sizer;
        exports = {};
        gVars = {
            colWidth: 8,
            colLenth: '',
            breakpoint: [768, 1024, 1280],
            query: [768, 960, 1152]
        };
        $window = $(window);
        $document = $(document);
        rileyColors = {
            b1: '#0090D9', b2: '#388AED', b3: '#008DDB', b4: '#068ECA', b5: '#0097DF',
            b6: '#0093DE', b7: '#3694ED', b8: '#4192F0', b9: '#009AE5', b0: '#2799F3',
            p1: '#D3707E', p2: '#CD6472', p3: '#D46773',
            k1: '#202B3D', k2: '#182A46',
            w1: '#E2EBF7', w2: '#EFF2F6',
            y1: '#D4A934', y2: '#CFA632', y3: '#D8AD34'
        };
        rileyColumns = [
            'b1', 'p1', 'b2', 'y1', 'b3', 'p2', 'b3', 'p2', 'k1', 'y1', 'b4', 'p2',
            'b2', 'p2', 'w1', 'b1', 'p2', 'b2', 'y1', 'b3', 'y1', 'b4', 'k2', 'y1',
            'b2', 'w1', 'p2', 'b5', 'p3', 'k2', 'b2', 'y1', 'b3', 'p2', 'b3', 'w1',
            'b2', 'b1', 'p2', 'b6', 'y1', 'b2', 'k2', 'b6', 'p2', 'b2', 'y1', 'b2',
            'w1', 'y1', 'b2', 'y1', 'b2', 'p2', 'k1', 'b2', 'y1', 'b2', 'b6', 'y3',
            'b6', 'w1', 'y1', 'b2', 'p3', 'b6', 'k2', 'y3', 'b6', 'y3', 'w1', 'p3',
            'b7', 'k1', 'y1', 'b2', 'y1', 'p3', 'b5', 'y1', 'b6', 'w1', 'y3', 'b5',
            'y3', 'b8', 'p3', 'k1', 'y3', 'b9', 'y3', 'b8', 'p1', 'b8', 'b5', 'w1',
            'b5', 'y3', 'b7', 'b5', 'p3', 'b8', 'k2', 'p1', 'b8', 'y1', 'b8', 'b9',
            'b0'
        ];
        rileyRect = [];
        moduleName = 'riley_fu';

        MakeShape = function(x, y, w, h, fill) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.fill = fill;
        };
        makeRileyRect = function() {
            var _i, getColor;
            for (_i = 0;_i < gVars.colLenth;_i += 1) {
                getColor = rileyColors[rileyColumns[_i]];
                rileyRect.push(new MakeShape((_i * gVars.colWidth), 0, gVars.colWidth, gVars.colWidth, getColor));
            }
        };
        drawCanvas = function($this) {
            var canvas, context, thisRect;
                
            canvas = document.createElement('canvas');
            canvas.width = gVars.colWidth * gVars.colLenth;
            canvas.height = gVars.colWidth;
            context = canvas.getContext('2d');

            for (var i in rileyRect) {
                thisRect = rileyRect[i];
                context.fillStyle = thisRect.fill;
                context.fillRect(thisRect.x, thisRect.y, thisRect.w, thisRect.h);
            }
            $this.css({
                'background-image': 'url(' + (canvas.toDataURL('image/png')) + ')'
            });

        };
        sizer = function($this) {
            var _width, bgPos, bgX;
            _width = $(document).width();
            if (_width < gVars.breakpoint[0]) {
                bgX = (11 / 12) * _width;
            }
            else if (_width < gVars.breakpoint[1]) {
                bgX = ((_width - gVars.query[0]) / 2) + ((5 / 6) * gVars.query[0]);
            }
            else if (_width < gVars.breakpoint[2]) {
                bgX = ((_width - gVars.query[1]) / 2) + ((5 / 6) * gVars.query[1]);
            }
            else {
                bgX = ((_width - gVars.query[2]) / 2) + ((5 / 6) * gVars.query[2]);
            }
            bgX = (Math.round(bgX) / 10).toString();
            bgPos = bgX + 'rem 0';
            $this.css('background-position', bgPos);
        };
        makeItHappen = function($this) {
            gVars.colLenth = rileyColumns.length;
            sizer($this);
            makeRileyRect();
            drawCanvas($this);
            $window.resize(function() {
                sizer($this);
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
