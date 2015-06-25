'use strict';

var rileyColors, rileyColumns, breakpoints, mediaQueries, colWidth, colHeight,
    colLength;

rileyColors = {
    b1: '#0090D9', b2: '#388AED', b3: '#008DDB', b4: '#068ECA', b5: '#0097DF',
    b6: '#0093DE', b7: '#3694ED', b8: '#4192F0', b9: '#009AE5', b0: '#2799F3',
    p1: '#D3707E', p2: '#CD6472', p3: '#D46773',
    k1: '#202B3D', k2: '#182A46',
    w1: '#E2EBF7', w2: '#EFF2F6',
    y1: '#D4A934', y2: '#CFA632', y3: '#D8AD34'
};

rileyColumns = [
    'b1', 'p1', 'b2', 'y1', 'b3', 'p2', 'b3', 'p2', 'k1', 'y1', 'b4', 'p2',
    'b2', 'p2', 'w1', 'b1', 'p2', 'b2', 'y1', 'b3', 'y1', 'b4', 'k2', 'y1',
    'b2', 'w1', 'p2', 'b5', 'p3', 'k2', 'b2', 'y1', 'b3', 'p2', 'b3', 'w1',
    'b2', 'b1', 'p2', 'b6', 'y1', 'b2', 'k2', 'b6', 'p2', 'b2', 'y1', 'b2',
    'w1', 'y1', 'b2', 'y1', 'b2', 'p2', 'k1', 'b2', 'y1', 'b2', 'b6', 'y3',
    'b6', 'w1', 'y1', 'b2', 'p3', 'b6', 'k2', 'y3', 'b6', 'y3', 'w1', 'p3',
    'b7', 'k1', 'y1', 'b2', 'y1', 'p3', 'b5', 'y1', 'b6', 'w1', 'y3', 'b5',
    'y3', 'b8', 'p3', 'k1', 'y3', 'b9', 'y3', 'b8', 'p1', 'b8', 'b5', 'w1',
    'b5', 'y3', 'b7', 'b5', 'p3', 'b8', 'k2', 'p1', 'b8', 'y1', 'b8', 'b9',
    'b0'
];

breakpoints = [768, 1024, 1280];
mediaQueries = [768, 960, 1152];

colWidth = 8;
colHeight = 8;

import {LocalStorageMethods} from 'AppConstants';

export default class RileyFuArt {

    static storeRileyShape = 'rileyRect';

    static colLength = rileyColumns.length;

    // determines the position of the background image.
    static sizer = () => {
        var windowWidth, bgWidth, bgX, bgPos;

        // this one is inaccurate as it measures the width of the browser with
        // the scrollbar
        //windowWidth = window.innerWidth;
        windowWidth = document.body.clientWidth;
        bgWidth = RileyFuArt.colLength * colWidth * -1;


        if (windowWidth < breakpoints[0]) {
            bgX = bgWidth + (11 / 12) * windowWidth;
        }
        else if (windowWidth < breakpoints[1]) {
            bgX = bgWidth + ((windowWidth - mediaQueries[0]) / 2) + ((1 / 6) *
                mediaQueries[0]);
        }
        else if (windowWidth < breakpoints[2]) {
            bgX = bgWidth + ((windowWidth - mediaQueries[1]) / 2) + ((1 / 6) *
                mediaQueries[1]);
        }
        else {
            bgX = bgWidth + ((windowWidth - mediaQueries[2]) / 2) + ((1 / 6) *
                mediaQueries[2]);
        }
        bgX = (Math.round(bgX) / 10).toString();
        bgPos = bgX + 'rem 0';

        return bgPos;
    };

    // will put in local storage the background image as Canvas, if either the
    // local storage does not exist or the cache has expired.
    static setCanvas = (cacheValidity) => {
        var storedCanvas = LocalStorageMethods.get(RileyFuArt.storeRileyShape);

        if (storedCanvas === undefined || cacheValidity === false) {
            var canvas, context, _l, getColor, colIndex;

            window.console.log('draw riley canvas');

            canvas = document.createElement('canvas');
            canvas.width = colWidth * RileyFuArt.colLength;
            canvas.height = colHeight;
            context = canvas.getContext('2d');

            for (_l = 0; _l < RileyFuArt.colLength; _l = _l + 1) {
                colIndex = RileyFuArt.colLength - _l - 1;
                getColor = rileyColors[rileyColumns[colIndex]];
                context.fillStyle = getColor;
                context.fillRect(_l * colWidth, 0, colWidth, colWidth);
            }
            LocalStorageMethods.set(
                RileyFuArt.storeRileyShape,
                JSON.stringify(canvas.toDataURL('image/png'))
            );
        }
    };

    static getCanvas = () => {
        var rileyTemplate = JSON.parse(LocalStorageMethods.get(
            RileyFuArt.storeRileyShape));

        return rileyTemplate;
    };

    static setBackgroundPosition = () => {
        var backgroundPosition = RileyFuArt.sizer();
        return backgroundPosition;
    };
};
