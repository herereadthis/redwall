'use strict';

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

    static setBackground = (
        parallaxSpeed, bgStyle, domHeight, offFromTop, starfield) => {
        var dScroll = document.body.scrollTop,
            wHeight = window.innerHeight,
            scrollSpeed, yPosition, newBgPosition;

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

            starfield.style.backgroundPosition = newBgPosition;
        }
    };

    static moveBackground = (parallaxSpeed, starfield) => {
        var domHeight, offFromTop, bgStyle, bgPosition;

        domHeight = starfield.offsetHeight;
        offFromTop = Math.round(starfield.getBoundingClientRect().top);
        bgStyle = getComputedStyle(starfield)['background-position'];
        bgPosition = ParallaxScroll.getBgPosition(bgStyle);

        window.addEventListener('scroll', function (event) {
            ParallaxScroll.setBackground(
                parallaxSpeed, bgPosition, domHeight, offFromTop, starfield
            );
        }, true);
    };

    static killScrollListener = () => {
        window.removeEventListener('scroll', function () {
        }, true);
    }
};
