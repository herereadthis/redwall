var scrollContainer, scrollBoxParentHeight, scrollTopPos, yClickPos,
    scrollButton, scrollButtonParentHeight, scrollBox, scrollDiff, arrowClick;

import {DomUtils} from 'AppConstants.js';

export default class NinetiesImageMethods {

    static setScrollContainerHeight = () => {
        var scrollBoxHeight;

        if (DomUtils.hasClass(scrollContainer.parentNode.parentNode,
                'nineties_img_container') === true) {
            scrollBoxParentHeight = scrollContainer.parentNode.parentNode.
                    offsetHeight - 1;


        }
        else if (DomUtils.hasClass(scrollContainer.parentNode,
                'nineties_img_container') === true) {
            scrollBoxParentHeight = scrollContainer.parentNode.offsetHeight - 1;
        }

        if (scrollBox !== undefined) {
            scrollBoxHeight = scrollBox.offsetHeight;

            window.console.log(scrollBoxHeight, scrollBoxParentHeight);

            if (scrollBoxHeight < scrollBoxParentHeight) {
                DomUtils.removeClass(scrollContainer, 'mac_os8_scrollable');
            }
            else {
                DomUtils.addClass(scrollContainer, 'mac_os8_scrollable');
            }
        }

        if (DomUtils.getStyle(scrollContainer, 'height', true) !==
            scrollBoxParentHeight) {
            DomUtils.changeStyle(scrollContainer, 'height',
                scrollBoxParentHeight);
        }


        //window.console.log(scrollBoxHeight, scrollBoxParentHeight);
    };

    static fixScrollContainerHeight = (scrollBoxContainer) => {
        scrollContainer = scrollBoxContainer;
        NinetiesImageMethods.setScrollContainerHeight();

        window.addEventListener(
            'resize',
            NinetiesImageMethods.setScrollContainerHeight
        );
    };

    static fixScrollBoxHeight = (scrollBoxElement) => {
        scrollBox = scrollBoxElement;
    };

    static killResizeListener = () => {
        window.removeEventListener(
            'resize',
            NinetiesImageMethods.setScrollContainerHeight
        );
    };

    static setscrollDrag = (event) => {
        var scrollMovement, actualScrollPos, scrollPercentage;

        scrollMovement = event.pageY - yClickPos;
        actualScrollPos = yClickPos - scrollTopPos + scrollMovement;
        scrollPercentage = actualScrollPos / scrollButtonParentHeight;

        window.console.log(Math.round(scrollPercentage * 100));

        scrollContainer.scrollTop = Math.round(scrollPercentage * scrollDiff);
    };

    static scrollDrag = (yPosClick, elementTop, element) => {
        yClickPos = yPosClick;
        scrollTopPos = elementTop;
        scrollButton = element;
        scrollDiff = scrollBox.offsetHeight - scrollBoxParentHeight;
        scrollButtonParentHeight = scrollButton.parentNode.offsetHeight;


        window.addEventListener(
            'mousemove',
            NinetiesImageMethods.setscrollDrag
        );

    };

    static killScrollDragListener = () => {
        window.removeEventListener(
            'mousemove',
            NinetiesImageMethods.setscrollDrag
        );
    };

    static killScrollDrag = () => {
        window.console.log(5);
        NinetiesImageMethods.killScrollDragListener();
    };

    static mouseUpDetection = () => {
        window.addEventListener(
            'mouseup',
            NinetiesImageMethods.killScrollDrag
        );
    };

    static killMouseUpDetection = () => {
        window.removeEventListener(
            'mouseup',
            NinetiesImageMethods.killScrollDrag
        );

    };

    static setArrowClick = (e) => {
        if (e.keyCode === 37) {
            arrowClick('prev');
        }
        if (e.keyCode === 39) {
            arrowClick('next');
        }
    };

    static fixArrowKeyStrokes = (method) => {
        arrowClick = method;
        window.addEventListener(
            'keyup',
            NinetiesImageMethods.setArrowClick
        );
    };

    static killArrowKeyStrokes = () => {
        window.removeEventListener(
            'keyup',
            NinetiesImageMethods.setArrowClick
        );
    }
}
