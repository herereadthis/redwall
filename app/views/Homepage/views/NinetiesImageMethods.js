var scrollContainer, scrollBoxParentHeight, scrollTopPos, yClickPos, scrollButton;

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

    static killResizeListener = () => {
        window.removeEventListener(
            'resize',
            NinetiesImageMethods.setScrollContainerHeight
        );
    };

    static setscrollDrag = (event) => {
        var scrollMovement;

        scrollMovement = event.pageY - yClickPos;
        window.console.log(scrollMovement);
    };

    static scrollDrag = (yPosClick, elementTop, element) => {
        yClickPos = yPosClick;
        scrollTopPos = elementTop;
        scrollButton = element;


        window.addEventListener(
            'mousemove',
            NinetiesImageMethods.setscrollDrag
        );

    }
}
