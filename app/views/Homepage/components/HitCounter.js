import React from 'react';
import axios from 'axios';

import {LocalStorageMethods} from 'AppConstants';

import HitCounterDefaults from './HitCounterDefaults';

let hitCounterValidity = true;

class HitCounterDigits extends React.Component {

    static HitDigit = 'hitDigit';

    constructor() {
        super();
    }

    // checks to see if a number exists in an array.
    // return one color if true, another color if false.
    arrayCheck = ( testArray, digit) => {
        if (testArray.indexOf(digit) === -1) {
            return this.props.colorOff;
        }
        else {
            return this.props.colorOn;
        }
    };

    // draws a polygon, given the context, the array of coordinates, and color
    polyDraw = (context, polyArray, color) => {
        var coords;
        context.beginPath();
        context.moveTo(polyArray[0], polyArray[1]);
        for (coords = 2; coords < polyArray.length - 1; coords = coords + 2) {
            context.lineTo(polyArray[coords], polyArray[coords + 1]);
        }
        context.closePath();
        context.fillStyle = color;
        context.fill();
    };

    makeCanvasBG = (digit) => {
        var storedHitDigit, lsHitDigit, key, canvas, bgImage, obj, cMatch;

        storedHitDigit = `${HitCounterDigits.HitDigit}${digit}`;
        lsHitDigit = LocalStorageMethods.get(storedHitDigit);

        // if params are no longer valid, or if the digit has not been drawn,
        // then draw the digit.
        if (lsHitDigit === undefined || hitCounterValidity === false) {

            canvas = document.createElement('canvas');
            canvas.width = this.props.numWidth;
            canvas.height = this.props.numHeight;

            for (key in HitCounterDefaults.lcd) {
                // isolate the specific bar
                obj = HitCounterDefaults.lcd[key];

                // determine if bar is 'on' or 'off' color for that specific digit
                cMatch = this.arrayCheck(obj.cMatch, digit);

                // create context for canvas for the spcific bar
                obj.context = canvas.getContext('2d');

                // draw the bar
                this.polyDraw(obj.context, obj.poly, cMatch);
            }
            bgImage = `url(${canvas.toDataURL('image/png')})`;

            LocalStorageMethods.set(storedHitDigit, bgImage);
        }
        // Otherwise, draw the digit from what is held in local storage.
        else {
            bgImage = lsHitDigit;
        }
        return {
            backgroundImage: bgImage
        };
    };

    makeNumbers = () => {
        var numArray, addZeros, _i, _j;

        // create an array out of the page hits, each item is a number
        numArray = this.props.pageHits.toString().split('');
        for (_j = 0; _j < numArray.length; _j = _j + 1) {
            numArray[_j] = parseInt(numArray[_j], 10);
        }
        // add enough decimal-leading zeros to array so that array is the size
        // of this.props.figures
        addZeros = this.props.figures - numArray.length;
        for (_i = 0; _i < addZeros; _i = _i + 1) {
            numArray.unshift(0);
        }
        return numArray.map((value, key) => {
            return (
                <div key={key} style={this.makeCanvasBG(value)}></div>
            );
        });
    };

    hitCounterWidth = () => {
        var minWidth = 0.4 + 2.2 * this.props.figures;
        minWidth = parseFloat(minWidth.toPrecision(12));

        return {
            width: `${minWidth}rem`
        };
    };

    render() {
        return (
            <div data-hit-counter
                 style={this.hitCounterWidth()}>{this.makeNumbers()}</div>

        );
    }
}

export default class HitCounter extends React.Component {

    constructor() {
        super();
    }

    static propTypes = {
        figures: React.PropTypes.number,
        colorOn: React.PropTypes.string,
        colorOff: React.PropTypes.string,
        numWidth: React.PropTypes.number,
        numHeight: React.PropTypes.number
    };

    static hitCounterParams = 'hitDigitParams';

    static defaultProps = {
        figures: HitCounterDefaults.figures,
        colorOn: HitCounterDefaults.colorOn,
        colorOff: HitCounterDefaults.colorOff,
        numWidth: HitCounterDefaults.numWidth,
        numHeight: HitCounterDefaults.numHeight
    };

    renderDigits = (pageHits) => {
        React.render(
            <HitCounterDigits pageHits={pageHits} {...this.props}/>,
            React.findDOMNode(this.refs.HitCounter)
        );
    };

    fetchHitCount(path) {
        var canonicalURL = 'http://herereadthis.com',
            serviceURL = 'http://redwall.herereadthis.com/api/page_stats/?url=',
            encodedURL, fetchUrl;

        encodedURL = encodeURIComponent(canonicalURL + path);
        fetchUrl = serviceURL + encodedURL;

        axios.get(fetchUrl)
            .then((response) => {
                this.renderDigits(response.data.page_hits);
            })
            .catch(() => {
                this.renderDigits(3000);
            });
    }

    componentWillMount() {
        var hitCounterParams, storedHitCounterParams;

        hitCounterParams = [
            this.props.colorOff,
            this.props.colorOn,
            this.props.numHeight,
            this.props.numWidth
        ];

        storedHitCounterParams = LocalStorageMethods.get(
            HitCounter.hitCounterParams);

        // storing the images for the hit counter are based off params.
        // if params do not exist, or new params are different than old ones,
        // then force a new canvas draw.
        if (storedHitCounterParams === undefined ||
            storedHitCounterParams !== JSON.stringify(hitCounterParams)) {
            LocalStorageMethods.set(
                HitCounter.hitCounterParams, JSON.stringify(hitCounterParams));
            hitCounterValidity = false;
        }
        this.fetchHitCount(this.props.path);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.figures !== this.props.figures;
    }

    render() {
        return (
            <div ref="HitCounter"></div>
        );
    }
}

