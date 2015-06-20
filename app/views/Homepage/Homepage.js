var React = require('react');

import { Link, RouteHandler} from 'react-router';

import Banner from './components/Banner';
import RetroArt from './components/RetroArt';
import RetroRules from './components/RetroRules';
import RileyFu from './components/RileyFu';

export default class Homepage extends React.Component {
    constructor() {
        super();
        this.state = {
            scrollTop: 0
        }
    }

    render() {
        return (
            <div id="retro_homepage">
                <Banner {...this.props} />
                <RetroArt {...this.props} />
                <RetroRules {...this.props} />
                <RileyFu {...this.props} />

                <h1>Hello world, it is nice to meet you!!!</h1>
                <ul>
                    <li><Link to="code">Code</Link></li>
                </ul>
            </div>
        );
    }
}

