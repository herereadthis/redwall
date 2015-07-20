var scrollContainer, scrollBoxParentHeight;

import {DomUtils} from 'AppConstants.js';

export default class NinetiesImageMethods {

    static setScrollContainerHeight = () => {
        scrollBoxParentHeight = scrollContainer.parentNode.parentNode.
                offsetHeight - 45;

        if (DomUtils.getStyle(scrollContainer, 'height', true) !==
            scrollBoxParentHeight) {
            DomUtils.changeStyle(scrollContainer, 'height',
                scrollBoxParentHeight);
        }
    };

    static setScrollVars = (scrollBoxContainer) => {
        scrollBoxParentHeight = scrollContainer.parentNode.parentNode.
                offsetHeight - 45;
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
}


