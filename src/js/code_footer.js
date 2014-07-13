(function() {
    define(function(require) {
        var $, exports, gVars, makeItHappen, makeLoops, makeBG, moduleName, gVars, phi;
        $ = require("jquery");
        exports = {};
        gVars = {
            canvasWidth: 0,
            canvasHeight: 0,
            sectionWidth: 0,
            sectionPadding: 0,
            bgTopPadding: 5,
            bgBottomPadding: 30
        };
        phi = (1+ Math.sqrt(5))/2 - 1;
        moduleName = "code_footer";
        _window = $(window);
        makeLoops = function() {
            var canvas,
                context
                
            canvas = document.createElement("canvas");
            canvas.width = gVars.canvasWidth;
            canvas.height = gVars.canvasHeight;
            context = canvas.getContext("2d");

            // X-COORDINATES
            var maxWidth, rightEdge, leftEdge, phiXPoint, curve1P2X;

            // right edge of window
            maxWidth = gVars.canvasWidth
            // right edge of section space
            rightEdge = Math.round((gVars.canvasWidth + gVars.sectionWidth) / 2);
            // left edge of section space
            leftEdge = Math.round((gVars.canvasWidth - gVars.sectionWidth) / 2);
            // inflection point of section space
            phiXPoint = rightEdge - (phi * gVars.sectionWidth);
            // X-coordinate of P2
            curve1P2X = (rightEdge - phiXPoint) * phi + phiXPoint;

            // Y -COORDINATES
            var baseline, bottomEdge;

            // very bottom of window
            baseline = gVars.canvasHeight;
            // bottom edge of curves
            bottomEdge = baseline - gVars.bgBottomPadding;

            context.beginPath();
            // path begins at right edge of window
            context.moveTo(maxWidth, 0);
            // line to right edge of section space
            context.lineTo(rightEdge, 0);
            // curve #1 goes from right edge of section space to inflection point
            context.bezierCurveTo(
                rightEdge, bottomEdge * phi, 
                curve1P2X, bottomEdge, 
                phiXPoint, bottomEdge
            );
            // curve #2 goes from inflection point to left edge of section space
            context.bezierCurveTo(
                (phiXPoint - leftEdge)/2 + leftEdge, bottomEdge, 
                leftEdge, (bottomEdge) * 0.75, 
                leftEdge, (bottomEdge) / 2
            );
            // curve #3 goes from left edge of section space to left edge of window
            context.bezierCurveTo(
                leftEdge, (bottomEdge) * 0.75, 
                leftEdge / 2, bottomEdge, 
                0, bottomEdge
            );
            // line to bottom left of screen
            context.lineTo(0,baseline);
            // line to bottom right of screen
            context.lineTo(maxWidth,baseline);
            // line to starting point
            context.lineTo(maxWidth,0);
            context.fillStyle = "rgba(245,245,245,1)";
            context.fill();

            // stroke isn't needed to trace shape
            // context.lineWidth = 0;
            // context.strokeStyle = 'rgba(245,0,245,1)';
            // context.stroke();

            return canvas

        };
        makeBG = function($this) {
            var sectionWidth, $section, $footerBackground;

            $section = $this.find('section');
            $footerBackground = $this.find('#footer_background');
            sectionWidth = $section.width();

            if (sectionWidth != gVars.sectionWidth) {
                gVars.sectionWidth = sectionWidth;
                gVars.sectionPadding = parseInt($section.css('padding-right'), 10);
                gVars.canvasWidth = $this.width();
                gVars.canvasHeight = $this.height();
                console.log(gVars);

                var canvas1 = makeLoops();

                return $footerBackground.css({
                    "background-image": "url(" + (canvas1.toDataURL("image/png")) + ")"
                });
            }
        }
        makeItHappen = function($this) {
            makeBG($this);
            _window.resize(function() {
                makeBG($this);
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
