'use strict';

import React from 'react';

import AppActions from 'AppActions';
import AppStore from 'AppStore';
import AppConstants from 'AppConstants';
import HitCounter from './HitCounter';
import DateRender from 'components/DateRender';
import ParallaxScroll from 'components/ParallaxScroll';

export default class RetroArt extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);
        let appStore = this.props.flux.getStore(AppStore.ID);
        var lastPath = appStore.getLastPath();
        this.setState({
            hitCounterPath: lastPath
        })
    }

    componentDidMount() {
        if (!this.props.flux) {
            return;
        }
        this.props.flux.getActions(AppActions.ID).fetchTimestamp(true);

        var starfield = React.findDOMNode(this.refs.starfield);

        ParallaxScroll.moveBackground(-50, starfield);

        window.addEventListener('resize', function () {
            ParallaxScroll.killScrollListener();
            ParallaxScroll.moveBackground(-50, starfield);
        }, true);
    }

    shouldComponentUpdate(nextProps, nextState) {
        let makeUpdate = false;
        if (nextProps.timestamp !== this.props.timestamp ||
            nextProps.ninetiesImg !== this.props.ninetiesImg) {
            makeUpdate = true;
        }
        return makeUpdate;
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

        return (
            <article id="retro_art" className="starfield cinnamon_fantasy parallax_scroll"
                     data-cinnamon-fantasy ref="starfield">
                <h2>This website is all that and a bag of chips!</h2>
                <section className="bellmaker_container">

                    <div className="centered_image">
                        <img
                            src="http://herereadthis.com/build/images/homepage/netscape_88x31.gif"
                            width={88} height={31}/>
                    </div>

                    <h3 className="before_text_1">
                        <span>This page was created by Jimmy Ha. Last updated: </span>
                        <DateRender date={this.props.timestamp.date}
                                    format="d MMMM yyyy"
                                    rdf="dc:modified"/>
                    </h3>

                    <div id="hit_counter">
                        <div><p>~~Congratulations, you are the</p></div>
                        <HitCounter figures={this.props.hitCounterFigures}
                                    path={this.state.hitCounterPath}
                                    flux={this.props.flux}/>
                        <div><p>visitor to this site!~~</p></div>
                    </div>

                    <div className="centered_image" style={addPadding(1)}>
                        {AppConstants.DataSprite('broken_image')}
                    </div>

                    <div id="email_joke">
                        <div><p>My Email:</p></div>
                        <div className="icon_box">{AppConstants.DataSprite('email')}</div>
                        <div>
                            <p><a href="mailto:herereadthis@hotmail.com">herereadthis@hotmail.com</a>
                            </p>
                        </div>
                    </div>

                    <div className="centered_image" style={addPadding(1)}>
                        <img
                            src="http://herereadthis.com/build/images/homepage/under_construction_128x40.gif"
                            width={128} height={31}/>
                    </div>

                    <hr className="rainbow_gradient"/>
                </section>

                <section className="bellmaker_container geocities_me">
                    <h3 style={tca}>Don't ever trust dolphins!</h3>

                    <table className="old_school_table">
                        <tr>
                            <td>
                                <div className="dancing_baby"></div>
                                <p style={tca}>&amp;nbsp;</p>
                                <div className="centered_image">
                                    {AppConstants.DataSprite('tripod_125x71')}
                                </div>
                            </td>
                            <td>
                                <div className="centered_image">
                                    <img
                                        src="http://herereadthis.com/build/images/homepage/power_rangers_500x375.gif"/>
                                </div>
                            </td>
                        </tr>
                    </table>

                    <hr className="rainbow_gradient"/>
                </section>
            </article>
        );
    }
}

