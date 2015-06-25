'use strict';

import React from 'react';

import AppActions from 'AppActions';
import AppStore from 'AppStore';
import AppConstants from 'AppConstants';

export default class RetroArt extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        var addPadding = (pad) => {
            return {
                paddingTop: `${pad}rem`
            }
        };

        var tca = {
            textAlign: 'center'
        };

        var h2Style = {
            color: '#FF0',
            textAlign: 'center',
            display: 'none'
        };
        var h3Style = {
            textAlign: 'center'
        };

        return (
            <article id="retro_art"
                     className="starfield parallax_scroll"
                     data-parallax-speed="-50"
                     ref="starfield">
                <h2>This website is all that and a bag of chips!</h2>
                <h2 style={h2Style}>Here are some awesome thing!</h2>
                <section className="bellmaker_container geocities_me">
                    <h3 style={h3Style}>1997 was the best year ever!</h3>

                    <div className="centered_image">
                        {AppConstants.DataSprite('titanic_468x60')}
                    </div>
                </section>
            </article>
        );
    }
}

