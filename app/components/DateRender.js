'use strict';

import React from 'react';

export default class DateRender extends React.Component {

    constructor() {
        super();
    }

    static testRegex = /(([a-z])+|([^a-z0-9]*))/gi;
    static keyRegex = /^\w+$/;
    static concatRegex = /(\w)\1*/g;

    static propTypes = {
        date: React.PropTypes.string.isRequired,
        format: React.PropTypes.string,
        rdf: React.PropTypes.string
    };

    static defaultProps = {
        date: '',
        format: 'yyyy-MM-dd',
        rdf: 'dc:date'
    };

    leadDecimal = (num, places) => {
        var sigFig = 2,
            zeroes = '',
            newNum = num.toString(),
            _t = 0;

        if (places !== undefined) {
            sigFig = places;
        }
        sigFig = sigFig - newNum.length;

        while (_t < sigFig) {
            zeroes = zeroes + '0';
            _t = _t + 1;
        }
        newNum = zeroes + newNum;

        return newNum;
    };

    makeDateObj = (date) => {
        var yyyy, yy, M, MMM, MMMM, w, www, wwww, d,
            H, h, a, m, s, S,
            tz, dateObj;

        // years
        yyyy = date.getFullYear();
        yy = yyyy.toString().substring(2, 4);

        // months
        M = date.getMonth();

        MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
            'Oct', 'Nov', 'Dec'];
        MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'];

        // days of the week
        w = date.getDay();
        www = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        wwww = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
            'Friday', 'Saturday'];

        // date
        d = date.getDate();

        // hours
        H = date.getHours();
        h = H;
        a = 'AM';
        if (h >= 12) {
            h = h - 12;
            a = 'PM';
        }
        if (h === 0) {
            h = 12;
        }

        // minutes
        m = date.getMinutes();

        // seconds
        s = date.getSeconds();

        // milliseconds
        S = date.getMilliseconds();

        // timezone
        tz = date.getTimezoneOffset();

        dateObj = {
            date: date,
            yyyy,
            yy,
            M: M + 1,
            MM: this.leadDecimal(M + 1),
            MMM: MMM[M],
            MMMM: MMMM[M],
            w: w + 1,
            ww: this.leadDecimal(w + 1),
            www: www[w],
            wwww: wwww[w],
            d,
            dd: this.leadDecimal(d),
            H,
            HH: this.leadDecimal(H),
            h,
            hh: this.leadDecimal(h),
            a,
            m,
            mm: this.leadDecimal(m),
            s,
            ss: this.leadDecimal(s),
            S,
            SS: this.leadDecimal(S,3),
            tz
        };
        return dateObj;
    };

    getFormatArray = (format) => {
        let formatArray = format.match(DateRender.testRegex),
            cleanArray  = [],
            concatFormat = [],
            _i, _k;

        for (_i = 0; _i < formatArray.length; _i = _i + 1) {
            if (formatArray[_i] !== '') {
                // in case DateRender is attempting to format a string like
                // yyyyMMdd or hh:mma
                concatFormat = formatArray[_i].match(DateRender.concatRegex);

                if (concatFormat !== null) {
                    for (_k = 0; _k < concatFormat.length; _k = _k + 1) {
                        cleanArray.push(concatFormat[_k]);
                    }
                }
                else {
                    cleanArray.push(formatArray[_i]);
                }
            }
        }
        return cleanArray;
    };

    // Array interesection http://stackoverflow.com/questions/16227197/
    /*
    interesect = (array1, array2) => {
        var commonValues = array1.filter((value) => {
            return array2.indexOf(value) > -1;
        });
        return commonValues;
    };
    */

    getDateTime = (dateObj, dateFormat) => {
        let dateValues = [],
            _k;

        for (_k = 0; _k < dateFormat.length; _k = _k + 1) {
            if (DateRender.keyRegex.test(dateFormat[_k]) === true) {
                dateValues.push(dateFormat[_k]);
            }
        }
        var dateTypes = {
            years: {
                regex: /y+/
            },
            months: {
                regex: /M+/
            },
            days: {
                regex: /d+/
            },
            hours: {
                regex: /h+/i
            },
            minutes: {
                regex: /m+/
            },
            seconds: {
                regex: /s+/
            },
            milliseconds: {
                regex: /S+/
            },
            timezone: {
                regex: /tz/
            }
        };

        var _l, _m,
            dateStamp = null,
            timeStamp = null,
            dateTime = '';

        for (_m in dateTypes) {
            dateTypes[_m].exists = false;

        }
        let dateTypeString = dateValues.join('');
        for (_l in dateTypes) {
            if (dateTypes[_l].regex.test(dateTypeString) === true) {
                dateTypes[_l].exists = true;
            }
        }

        /*
        var existArray = [];
        for (_l in dateTypes) {
            if (this.interesect(dateTypes[_l].match, dateValues).length !== 0) {
                dateTypes[_l].exists = true;
            }
            if (dateTypes[_l].regex.test()
            existArray.push(dateTypes[_l].exists);
        }
        */

        // timestamp can be yyyy-MM-dd, yyyy-MM, MM-dd, or yyyy,
        // but not yyyy-dd, mm, or dd
        if (dateTypes.years.exists === true) {
            dateStamp = `${dateObj.yyyy}`;

            if (dateTypes.months.exists === true) {
                dateStamp = `${dateStamp}-${dateObj.MM}`;
            }
            if (dateTypes.days.exists === true) {
                dateStamp = `${dateStamp}-${dateObj.dd}`;
            }
        }
        else if (dateTypes.months.exists === true &&
            dateTypes.days.exists === true) {
            dateStamp = `${dateObj.MM}-${dateObj.dd}`
        }
        if (dateTypes.hours.exists === true) {

        }
        if (dateTypes.hours.exists === true) {
            timeStamp = `${dateObj.HH}`;
            if (dateTypes.minutes.exists === true) {
                timeStamp = `${timeStamp}:${dateObj.mm}`;
                if (dateTypes.seconds.exists === true) {
                    timeStamp = `${timeStamp}:${dateObj.ss}`;
                    if (dateTypes.milliseconds.exists === true) {
                        timeStamp = `${timeStamp}:${dateObj.SS}`;
                    }
                }
            }
        }
        if (dateStamp !== null) {
            dateTime = dateStamp;
            if (timeStamp !== null) {
                dateTime = `${dateTime}T${timeStamp}`;
            }
        }
        else if (timeStamp !== null) {
            dateTime = timeStamp;
        }

        return dateTime;
    };

    getDateValues = (dateObj, dateFormat) => {
        let dateValues = [],
            _j;

        for (_j = 0; _j < dateFormat.length; _j = _j + 1) {
            if (DateRender.keyRegex.test(dateFormat[_j]) === true) {
                dateValues.push(dateObj[dateFormat[_j]]);
            }
            else {
                dateValues.push(dateFormat[_j]);
            }
        }
        return dateValues.join('');
    };

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.date !== this.props.date;
    }

    render() {
        let checkIfDate = Date.parse(this.props.date);

        if (isNaN(checkIfDate) === false || this.props.date !== '') {
            let date = new Date(this.props.date);
            let dateObj = this.makeDateObj(date);
            let dateFormat = this.getFormatArray(this.props.format);

            let formattedDate = this.getDateValues(dateObj, dateFormat);
            let dateStamp = this.getDateTime(dateObj, dateFormat);
            return (
                <time dateTime={dateStamp}
                      property={this.props.rdf}>{formattedDate}</time>
            );

        }
        else {
            return null;
        }
    }
}
