import React from 'react';

export default class DateRender extends React.Component {

    static propTypes = {
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.instanceOf(Date)
        ]).isRequired,
        timeZone: PropTypes.number,
        metaData: PropTypes.string,
        language: PropTypes.oneOf([
            'en', 'fr', 'es', 'ru', 'hu'
        ])
    };

    static defaultProps = {
        timeZone: 240 / 6,
        metaData: 'yyyy-MM-dd HH:mm:ss',
        language: 'en'
    };

    constructor() {
        super();
    }

    componentWillMount() {
        var MMM, MMMM, www, wwww;
        // French
        if (this.props.language === 'fr') {
            MMM = ['janv', 'févr', 'mars', 'avril', 'mai', 'juin', 'juil',
                'août', 'sept', 'oct', 'nov', 'déc'];
            MMMM = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
                'juillet', 'août', 'septembre', 'octobre', 'novembre',
                'décembre'];
            www = ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'];
            wwww = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi',
                'dimanche'];
        }
        // Spanish
        else if (this.props.language === 'es') {
            MMM = ['enero', 'feb', 'marzo', 'abr', 'mayo', 'jun', 'jul',
                'agosto', 'set', 'oct', 'nov', 'dic'];
            MMMM = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                'julio', 'agosto', 'septiembre', 'octubre', 'noviembre',
                'diciembre'];
            www = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
            wwww = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves',
                'viernes', 'sábado'];

        }
        // Russian
        else if (this.props.language === 'ru') {
            MMM = ['ianv', 'февр', 'март', 'апр', 'май', 'июнь', 'июль', 'авг',
                'сент', 'окт', 'ноябрь', 'дек'];
            MMMM = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
                'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
            www = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
            wwww = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг',
                'пятница', 'суббота'];
        }
        // catch-all is English
        else {
            MMM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'];
            MMMM = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November',
                'December'];
            www = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            wwww = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                'Friday', 'Saturday'];
        }
        this.setState({
            MMM,
            MMMM,
            www,
            wwww
        });
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
        var yyyy, yy, M, w, d,
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
            MMM: this.state.MMM[M],
            MMMM: this.state.MMMM[M],
            w: w + 1,
            ww: this.leadDecimal(w + 1),
            www: this.state.www[w],
            wwww: this.state.wwww[w],
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
            SS: this.leadDecimal(S, 3),
            tz
        };
        return dateObj;
    };

    getFormatArray = (format) => {
        let formatArray = format.match(DateRender.testRegex),
            cleanArray = [],
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
        let dateValues = [], _k, dateTypeString;

        for (_k = 0; _k < dateFormat.length; _k = _k + 1) {
            if (DateRender.keyRegex.test(dateFormat[_k]) === true) {
                dateValues.push(dateFormat[_k]);
            }
        }
        var dateTypes, _l, _m,
            dateStamp = null,
            timeStamp = null,
            dateTime = '';

        dateTypes = {
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

        for (_m in dateTypes) {
            dateTypes[_m].exists = false;

        }
        dateTypeString = dateValues.join('');
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
            dateStamp = `${dateObj.MM}-${dateObj.dd}`;
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

    shouldComponentUpdate(nextProps) {
        return nextProps.date !== this.props.date;
    }

    render() {
        let checkIfDate = Date.parse(this.props.date);

        if (isNaN(checkIfDate) === false || this.props.date !== '') {
            let date, dateObj, dateFormat, formattedDate, dateStamp;

            date = new Date(this.props.date);
            dateObj = this.makeDateObj(date);
            dateFormat = this.getFormatArray(this.props.format);

            formattedDate = this.getDateValues(dateObj, dateFormat);
            dateStamp = this.getDateTime(dateObj, dateFormat);

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
