'use strict';

let elements = [];

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
            if (bgPosition[_i] === 'center') {
                bgPosition[_i] = '50%';
            }
            else if (bgPosition[_i] === 'top' || bgPosition[_i] === 'left') {
                bgPosition[_i] = '0%';
            }
            else if (bgPosition[_i] === 'bottom' ||
                bgPosition[_i] === 'right') {
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
            scrollSpeed, yPosition, newBgPosition, _k;

        for (_k = 0; _k < elements.length; _k = _k + 1) {

            // logic:
            // 1. the top edge of the element is inside the window during
            // scrolling, or 2. the bottom edge of the element has not been
            // exceeded by scrolling
            if (dScroll + wHeight > elements[_k].offsetTop &&
                elements[_k].offsetTop + elements[_k].domHeight > dScroll) {

                // scroll speed is a percentage of the actual scrolling
                scrollSpeed = elements[_k].parallaxSpeed / 100;
                // y-position of background position
                yPosition = -1 * Math.round(dScroll * scrollSpeed);

                // combine exising x-position and y-position of bg-position
                newBgPosition = `${elements[_k].bgX} ${yPosition}px`;
                //window.console.log(_k, elOSet, newBgPosition);

                elements[_k].node.style.backgroundPosition = newBgPosition;
            }
        }
    };

    static moveBackground = (parallaxEl) => {
        var getParallaxSpeed, parallaxRef, bgPosition, _l, bgStyle = [];

        elements = [];

        for (_l = 0; _l < parallaxEl.length; _l = _l + 1) {
            getParallaxSpeed = 0;
            parallaxRef = parallaxEl[_l].getAttribute('data-parallax-speed');
            if (parallaxRef !== undefined && parallaxRef !== null &&
                isNaN(parallaxRef) === false) {
                getParallaxSpeed = parseInt(parallaxRef, 10);
            }

            bgStyle.push(getComputedStyle(
                parallaxEl[_l])['background-position']);
            bgPosition = ParallaxScroll.getBgPosition(bgStyle[_l]);

            elements.push({
                node: parallaxEl[_l],
                parallaxSpeed: getParallaxSpeed,
                domHeight: parallaxEl[_l].offsetHeight,
                offsetTop: Math.round(
                    parallaxEl[_l].getBoundingClientRect().top +
                    document.body.scrollTop),
                bgX: bgPosition[0],
                bgY: bgPosition[1]
            });
        }
        window.addEventListener('scroll', ParallaxScroll.setBackground, true);
    };

    static killScrollListener = () => {
        window.removeEventListener('scroll', ParallaxScroll.setBackground,
            true);
    }
}

