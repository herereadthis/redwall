var React = require('react');

import {Link} from 'react-router';

import Banner from './components/Banner';
import RetroArt from './components/RetroArt';
import RetroRules from './components/RetroRules';
import RileyFu from './components/RileyFu';
import RetroTitanic from './components/RetroTitanic';
import RetroFooter from './components/RetroFooter';

import ParallaxScroll from 'components/ParallaxScroll';

export default class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            scrollTop: 0
        };
    }

    componentDidMount() {
        var parallaxScroll = document.getElementsByClassName('parallax_scroll');

        ParallaxScroll.moveBackground(parallaxScroll);

        window.addEventListener('resize', function () {
            ParallaxScroll.killScrollListener();
            ParallaxScroll.moveBackground(parallaxScroll);
        }, true);
    }

    render() {
        return (
            <div id="retro_homepage">
                <Banner {...this.props} />
                <RetroArt {...this.props} />
                <RetroRules />
                <RileyFu />
                <RetroTitanic />
                <RetroFooter {...this.props} />

                <h1>Hello world, it is nice to meet you!!!</h1>
                <ul>
                    <li><Link to="code">Code</Link></li>
                </ul>
            </div>
        );
    }
}

