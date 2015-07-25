var scrollContainer, scrollBoxParentHeight, scrollTopPos, yClickPos, scrollButton, scrollButtonParentHeight, scrollBox, scrollDiff;

import {DomUtils} from 'AppConstants.js';

export default class NinetiesImageMethods {

    static setScrollContainerHeight = () => {
        scrollBoxParentHeight = scrollContainer.parentNode.parentNode.
                offsetHeight - 1;

        if (DomUtils.getStyle(scrollContainer, 'height', true) !==
            scrollBoxParentHeight) {
            DomUtils.changeStyle(scrollContainer, 'height',
                scrollBoxParentHeight);
        }
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

        window.console.log(scrollMovement,
            Math.round(scrollPercentage * 100) / 100, scrollDiff);

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
}
