(function() {
    define(function(require) {
        var $, exports, gVars, makeItHappen, makeLoops, makeBG, moduleName, gVars;
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
        moduleName = "code_footer";
        _window = $(window);
        makeLoops = function() {
            var canvas, context;

            canvas = document.createElement("canvas");
            canvas.width = gVars.canvasWidth;
            canvas.height = gVars.canvasHeight;
            context = canvas.getContext("2d");

            var rightEdge = Math.round((gVars.canvasWidth + gVars.sectionWidth) / 2);

            var leftEdge = Math.round((gVars.canvasWidth - gVars.sectionWidth) / 2);

            var midPoint = Math.round((gVars.canvasWidth) / 2);

            var bottomEdge = gVars.canvasHeight;
            var baseline = bottomEdge - gVars.bgBottomPadding
            console.log(bottomEdge,baseline);

            rightEdge = rightEdge + 0;

            context.beginPath();
            context.moveTo(gVars.canvasWidth, 0);
            context.lineTo(rightEdge, 0);

            context.bezierCurveTo(
                rightEdge, 150, 
                (rightEdge - midPoint)/2 + midPoint, bottomEdge - gVars.bgBottomPadding, 
                midPoint, bottomEdge - gVars.bgBottomPadding);

            context.bezierCurveTo(
                (midPoint - leftEdge)/2 + leftEdge, bottomEdge - gVars.bgBottomPadding, 
                leftEdge, 150, 
                leftEdge, 100);

            context.bezierCurveTo(
                leftEdge, 150, 
                leftEdge / 2, bottomEdge - gVars.bgBottomPadding, 
                0, bottomEdge - gVars.bgBottomPadding);

            context.lineTo(0,bottomEdge);

            context.lineTo(gVars.canvasWidth,bottomEdge);
            context.lineTo(gVars.canvasWidth,0);
            context.fillStyle = "rgba(245,245,245,1)";
            context.fill();


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
