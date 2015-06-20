'use strict';

export default class HitCounterDefaults {

    static figures = 6;

    static colorOn = 'rgba(0,255,0,1)';
    static colorOff = 'rgba(0,255,0,0.18)';

    static numWidth = 120;
    static numHeight = 240;

    static lcd = {
        // top horizontal bar
        tb: {
            cMatch: [0,2,3,5,6,7,8,9],
            poly: [18,12, 30,0, 90,0, 102,12, 90,24, 30,24]
        },
        // middle horizontal bar
        mb: {
            cMatch: [2,3,4,5,6,8,9],
            poly: [18,108, 30,96, 90,96, 102,108, 90,120, 30,120]
        },
        // bottom horizontal bar
        bb: {
            cMatch: [0,2,3,5,6,8],
            poly: [18,204, 30,192, 90,192, 102,204, 90,216, 30,216]
        },
        // top left vertical bar
        tl: {
            cMatch: [0,4,5,6,8,9],
            poly: [0,30, 12,18, 24,30, 24,90, 12,102, 0,90]
        },
        // top right vertical bar
        tr: {
            cMatch: [0,1,2,3,4,7,8,9],
            poly: [96,30, 108,18, 120,30, 120,90, 108,102, 96,90]
        },
        // bottom left vertical bar
        bl: {
            cMatch: [0,2,6,8],
            poly: [0,126, 12,114, 24,126, 24,186, 12,198, 0,186]
        },
        // bottom right vertical bar
        br: {
            cMatch: [0,1,3,4,5,6,7,8,9],
            poly: [96,126, 108,114, 120,126, 120,186, 108,198, 96,186]
        }
    };
};
