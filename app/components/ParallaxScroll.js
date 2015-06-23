'use strict';

let elements = [];

let elementOffsets = [];

export default class ParallaxScroll {

    static getBgPosition = (bgStyle) => {
        var bgPosition, _i;
        bgPosition = bgStyle.split(' ');

        // you can state background position as one value that doubles for x/y.
        // if so, make both values equal.
        if (bgPosition.length === 1) {
            bgPosition[1] = bgPosition[0];
        }
        // it should grab top|center|etc as percentages, but we'll force it.
        for (_i = 0; _i < 2; _i++) {
            if (bgPosition[_i] === "center") {
                bgPosition[_i] = '50%';
            }
            else if (bgPosition[_i] === "top" || bgPosition[_i] === "left") {
                bgPosition[_i] = '0%';
            }
            else if (bgPosition[_i] === "bottom" ||
                bgPosition[_i] === "right") {
                bgPosition[_i] = '100%';
            }
            if (/%/.test(bgPosition[_i]) === true) {
                if (parseInt(bgPosition[_i], 10) === 0) {
                    bgPosition[_i] = 0;
                }
            }
        }
        return bgPosition;

    };

    static setBackground = () => {
        var dScroll = document.body.scrollTop,
            wHeight = window.innerHeight,
            scrollSpeed, yPosition, newBgPosition;

        var _k;

        for (_k = 0;_k < elements.length;_k = _k + 1) {
            elementOffsets[_k] = Math.round(
                elements[_k].node.getBoundingClientRect().top);
        }
        window.console.log(elementOffsets);

        //window.console.log(elements);

        /*
        // logic:
        // 1. the top edge of the element is inside the window during scrolling,
        // 2. the bottom edge of the element has not been exceeded by scrolling
        if (dScroll + wHeight > offFromTop &&
            offFromTop + domHeight > dScroll) {

            // scroll speed is a percentage of the actual scrolling
            scrollSpeed = parallaxSpeed / 100;
            // y-position of background position
            yPosition = -1 * Math.round(dScroll * scrollSpeed);

            // combine exising x-position and y-position of background-position
            newBgPosition = `${bgStyle[0]} ${yPosition}px`;

            //starfield.style.backgroundPosition = newBgPosition;
            //document.getElementsByClassName('starfield').style.backgroundPosition = newBgPosition;
            window.console.log(document.getElementsByClassName('starfield'), 2);
        }
        */
    };

    static moveBackground = (starfield) => {
        var getParallaxSpeed, parallaxRef, bgPosition, _l, bgStyle = [];

        elements = [];

        // first starfield describes all starfields

        for (_l = 0;_l < starfield.length;_l = _l + 1) {
            getParallaxSpeed = 0;
            parallaxRef = starfield[_l].getAttribute('data-parallax-speed');
            if (parallaxRef !== undefined && parallaxRef !== null &&
                isNaN(parallaxRef) === false) {
                getParallaxSpeed = parseInt(parallaxRef, 10);
            }

            bgStyle.push(getComputedStyle(
                starfield[_l])['background-position']);
            bgPosition = ParallaxScroll.getBgPosition(bgStyle[_l]);

            /*

             offFromTop: Math.round(
             starfield[_l].getBoundingClientRect().top),
             */

            elements.push({
                node: starfield[_l],
                parallaxSpeed: getParallaxSpeed,
                domHeight: starfield[_l].offsetHeight,
                bgX: bgPosition[0],
                bgY: bgPosition[1]
            });
        }
        window.console.log(elements);

        window.addEventListener('scroll', ParallaxScroll.setBackground, true);
    };

    static killScrollListener = () => {
        window.removeEventListener('scroll', ParallaxScroll.setBackground, true);
    }
};
