'use strict';

import React from 'react';
import AppConstants from 'AppConstants';
import RileyFuArt from 'components/RileyFuArt.js';

export default class RileyFu extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
    }

    componentDidMount() {
        var backgroundPosition = RileyFuArt.setBackgroundPosition();
        var rileyFu =  React.findDOMNode(this.refs.rileyFu);

        RileyFuArt.drawCanvas();

        rileyFu.style.backgroundPosition = backgroundPosition;

        window.addEventListener('resize', function () {
            rileyFu.style.backgroundPosition = backgroundPosition;
        }, true);

    }

    render() {
        return (
            <article id="riley_fu" ref="rileyFu">
                <h2 className="bellmaker_container">I swear, I actually know <a href="/code/" title="Here, Read This Code">how to code</a>.</h2>

                <section className="bellmaker_container">
                    <h3>Cool code things on this page:</h3>
                    <ul>
                        <li>This web application is using ReactJS with Flummox, an implemenation of Flux.</li>
                        <li>All Javascript is bundled with Webpack.</li>
                        <li>There is zero jQuery! None!</li>
                        <li>This site will render on any device: your phone, your tablet, or your computer.</li>
                    </ul>

                    {AppConstants.DataSprite('broken_image')}
                </section>
            </article>
        );
    }
}

