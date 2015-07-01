'use strict';

import React from 'react';

export default class AppConstants {

    static HomepageConfig = {
        imgUrl: 'http://herereadthis.com/build/images/',
        hitCounterFigures: 6
    };

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
            let numRegex = /^(\d+\.?\d*|\d+,?\d*|\.\d+|,\d+)$/;

            if (str === undefined) {
                return;
            }

            if (str === 'false') {
                return false;
            }
            else if (str === 'true') {
                return true;
            }
            else if (str.length < 20) {
                if (numRegex.test(str) === true) {
                    return parseFloat(str, 10);
                }
                else {
                    return str;
                }
            }
            else {
                return str;
            }
        }
    };

    static dataSprite = (sprite) => {
        return (
            <div data-sprite={sprite}/>
        );
    };

    static getRandomInteger = (max) => {
        return Math.floor(Math.random() * max);
    }
}

