'use strict';

var React = require('react');

// The Color Shifter
// takes a string of characters and gives it a color range as you define them.

export default class ColorShiftTitle extends React.Component {

    static propTypes = {
        title: React.PropTypes.string.isRequired,
        colorShift: React.PropTypes.shape({
            begin: React.PropTypes.string,
            end: React.PropTypes.string
        })
    };

    static defaultProps = {
        colorShift: {
            begin: '000',
            end: 'FFF'
        }
    };

    componentWillMount() {
        this.setState({
            colorShift: {
                begin: this.hexToRgb(this.props.colorShift.begin),
                end: this.hexToRgb(this.props.colorShift.end)
            }
        });
    }

    // hexToRgb function taken from
    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    hexToRgb = (hex) => {
        // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex, newHex;
        shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        newHex = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    makeLetters = () => {
        let colors, colorDiff;

        colors = this.state.colorShift;
        colorDiff = {
            r: colors.end.r - colors.begin.r,
            g: colors.end.g - colors.begin.g,
            b: colors.end.b - colors.begin.b
        };

        let lettersArray = this.props.title.split('');

        return lettersArray.map((value, key) => {
            let increment, diffR, diffG, diffB, rgbValue;
            increment = key / (lettersArray.length - 1);

            // each RGB value gets one more increment of the diff value
            diffR = Math.round(colors.begin.r + increment * colorDiff.r);
            diffG = Math.round(colors.begin.g + increment * colorDiff.g);
            diffB = Math.round(colors.begin.b + increment * colorDiff.b);

            rgbValue = {
                color: `rgb(${diffR},${diffG},${diffB})`
            };
            return (
                <span key={key} style={rgbValue}>{value}</span>
            );
        });
    };

    render() {
        return (
            <span>{this.makeLetters()}</span>
        );
    }
}
