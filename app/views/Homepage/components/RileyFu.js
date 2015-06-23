'use strict';

import React from 'react';
import AppConstants from 'AppConstants';
import RileyFuArt from 'components/RileyFuArt.js';

export default class RileyFu extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        RileyFuArt.setCanvas(true);
    }

    componentDidMount() {
        var backgroundPosition = RileyFuArt.setBackgroundPosition();
        var backgroundImage = RileyFuArt.getCanvas();
        var rileyFu = React.findDOMNode(this.refs.rileyFu);

        rileyFu.style.backgroundPosition = backgroundPosition;
        rileyFu.style.backgroundImage = 'url(' + backgroundImage + ')';

        window.addEventListener('resize', function () {
            backgroundPosition = RileyFuArt.setBackgroundPosition();
            rileyFu.style.backgroundPosition = backgroundPosition;
        }, true);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cacheValidity === false) {
            RileyFuArt.setCanvas(nextProps.cacheValidity);
        }
    }

    shouldComponentUpdate(nextProps) {
        return this.props.cacheValidity !== nextProps.cacheValidity;
    }

    render() {
        window.console.log(this.props.cacheValidity);
        return (
            <article id="riley_fu" ref="rileyFu">
                <h2 className="bellmaker_container">I swear, I actually know <a
                    href="/code/" title="Here, Read This Code">how to code</a>.
                </h2>

                <section className="bellmaker_container">
                    <h3>Github Repositories!</h3>
                    <ul>
                        <li><strong><a
                            href="https://github.com/herereadthis/bellmaker"
                            title="Bellmaker">Bellmaker</a></strong>
                            <span>, Responsive CSS media query library for LESS
                                and SASS, with device-agnostic and device-
                                specific breakpoints</span></li>
                        <li><strong><a
                            href="https://github.com/herereadthis/mossflower"
                            title="Mossflower">Mossflower</a></strong>
                            <span>, a global reset CSS utility for both LESS and
                                SASS</span></li>
                        <li><strong><a
                            href="https://github.com/herereadthis/redwall"
                            title="Redwall">Redwall</a></strong>
                            <span>, the codebase for the &ldquo;Here, Read
                                This&rdquo; website</span></li>
                    </ul>
                    {AppConstants.DataSprite('broken_image')}
                    <p>&lt;BR&gt;</p>
                    <h3>Cool code things on this page:</h3>
                    <ul>
                        <li><span>This web application is using </span>
                            <strong>ReactJS</strong> with Flummox, an
                            implemenation of Flux.
                        </li>
                        <li><span>All JavaScript is bundled with </span>
                            <strong>Webpack</strong>.
                        </li>
                        <li><span>To minimize processing, </span>
                            <strong>LocalStorage</strong> is holding Canvas
                            renders, JSON, and cache info.
                        </li>
                        <li>There is <strong>zero jQuery</strong>! None!</li>
                        <li>Using <strong>media queries</strong>, this site will
                            render on your phone, tablet, and computer.
                        </li>
                    </ul>
                    {AppConstants.DataSprite('broken_image')}
                    <p>&lt;BR&gt;</p>
                </section>
            </article>
        );
    }
}

