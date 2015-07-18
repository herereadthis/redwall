import React from 'react';

export default class AppConstants {

    static LocalStorageMethods = {
        set: (key, value) => {
            localStorage[key] = value;
        },
        get: (item) => {
            let obj = localStorage[item];
            return AppConstants.StringMethods.parseString(obj);
        },
        remove: (key)=> {
            localStorage.removeItem(key);
        }
    };

    static SessionStorageMethods = {
        set: (key, value) => {
            sessionStorage[key] = value;
        },
        get: (item) => {
            let obj = sessionStorage[item];
            return AppConstants.StringMethods.parseString(obj);
        },
        remove: (key)=> {
            sessionStorage.removeItem(key);
        }
    };

    static StringMethods = {
        testIfJSON: (str) => {
            try {
                JSON.parse(str);
            }
            catch (e) {
                return false;
            }
            return true;
        },
        parseString: (str) => {
            let numRegex = /^(\d+\.?\d*|\d+,?\d*|\.\d+|,\d+)$/,
                finalVal = str;

            if (str === 'false') {
                finalVal = false;
            }
            else if (str === 'true') {
                finalVal = true;
            }
            else if (str !== undefined && str.length < 20) {
                if (numRegex.test(str) === true) {
                    finalVal = parseFloat(str, 10);
                }
            }
            return finalVal;
        }
    };

    static dataSprite = (sprite) => {
        return (
            <div data-sprite={sprite}/>
        );
    };

    static getRandomInteger = (max) => {
        return Math.floor(Math.random() * max);
    };

    static getRouteData = (router) => {
        var currentRoutes = router.getCurrentRoutes();
        return {
            id: router.getCurrentParams().id,
            name: currentRoutes[currentRoutes.length - 1].name
        };
    };

    static DomUtils = {
        addClass: (element, classToAdd) => {
            if (element.classList !== undefined) {
                element.classList.add(classToAdd);
            }
            else {
                element.className = element.classToAdd + ' ' +
                    classToAdd;
            }
        },
        removeClass: (element, classToRemove) => {
            if (element.classList) {
                element.classList.remove(classToRemove);
            }
            else {
                var regex = new RegExp('(^|\\b)' +
                    classToRemove.split(' ').join('|') + '(\\b|$)', 'gi');
                element.className = element.className.replace(regex, ' ');
            }
        },
        changeStyle: (element, attribute, increment) => {
            element.style[attribute] = `${increment}px`;
        },
        unsetStyle: (element, attribute) => {
            element.style[attribute] = null;
        },
        getStyle: (element, attribute, asInteger) => {
            var theStyle = element.style[attribute];

            if (asInteger === true) {
                theStyle = parseInt(theStyle, 10);
            }
            return theStyle;
        },
        clickOutside: (event, element) => {
            var boxDims, boundX = false, boundY = false, result = false;

            boxDims = {
                top: element.offsetTop,
                left: element.offsetLeft
            };
            boxDims.right = boxDims.left + element.offsetWidth;
            boxDims.bottom = boxDims.top + element.offsetHeight;

            if (event.pageX < boxDims.left || event.pageX > boxDims.right) {
                boundX = true;
            }
            if (event.pageY < boxDims.top || event.pageY > boxDims.bottom) {
                boundY = true;
            }
            if (boundX === true || boundY === true) {
                result = true;
            }
            return result;
        }
    }
}

