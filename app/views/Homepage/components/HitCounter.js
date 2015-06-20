'use strict';

import React from 'react';
import axios from 'axios';

import AppActions from 'AppActions';

import HitCounterDefaults from './HitCounterDefaults';

class HitCounterDigits extends React.Component {

    constructor() {
        super();
    }


    // checks to see if a number exists in an array.
    // return one color if true, another color if false.
    arrayCheck = (testArray, digit) => {
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
        for (coords = 2; coords < polyArray.length - 1; coords += 2) {
            context.lineTo(polyArray[coords], polyArray[coords + 1]);
        }
        context.closePath();
        context.fillStyle = color;
        context.fill();
    };

    makeCanvasBG = (digit) => {
        var key, canvas;

        canvas = document.createElement('canvas');
        canvas.width = this.props.numWidth;
        canvas.height = this.props.numHeight;

        for (key in HitCounterDefaults.lcd) {
            // isolate the specific bar
            let obj = HitCounterDefaults.lcd[key];
            // determine if bar is 'on' or 'off' color for that specific digit
            let cMatch = this.arrayCheck(obj.cMatch, digit);
            // create context for canvas for the spcific bar
            obj.context = canvas.getContext('2d');
            // draw the bar
            this.polyDraw(obj.context, obj.poly, cMatch);
        }
        return {
            backgroundImage: `url(${canvas.toDataURL('image/png')})`
        }
    };

    makeNumbers = () => {
        var numArray, addZeros, _i, _j;

        // create an array out of the page hits, each item is a number
        numArray = this.props.pageHits.toString().split('');
        for (_j = 0;_j < numArray.length;_j = _j + 1) {
            numArray[_j] = parseInt(numArray[_j], 10);
        }
        // add enough decimal-leading zeros to array so that array is the size
        // of this.props.figures
        addZeros = this.props.figures - numArray.length;
        for (_i = 0;_i < addZeros;_i = _i + 1) {
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
        }
    };

    render() {
        return (
            <div data-hit-counter
                 style={this.hitCounterWidth()}>{this.makeNumbers()}</div>

        )
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
            .catch((response) => {
                this.renderDigits(3000);
            })
    }

    componentWillMount() {
        this.fetchHitCount(this.props.path);
    }

    render() {
        return (
            <div ref="HitCounter"></div>
        );
    }
}

