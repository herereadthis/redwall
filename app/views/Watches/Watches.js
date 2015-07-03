import React from 'react';
import {RouteHandler} from 'react-router';

import FluxComponent from 'flummox/component';

//import AddMoreFlux from 'components/AddMoreFlux.js';
import AppActions from 'AppActions';
import WatchTable from './WatchTable';
import WatchFlux from './WatchFlux.js';

require('mossflower');
require('./watches.less');

export default class Watches extends React.Component {

    constructor() {
        super();
    }

    static contextTypes = {
        router: React.PropTypes.func
    };

    currentPath() {
        let currentPath = this.context.router.getLocation().getCurrentPath();
        return currentPath;
    }

    componentWillMount() {
        new WatchFlux(this.props.flux);

        let currentPath = this.currentPath();
        this.props.flux.getActions(AppActions.ID).setCacheAge();
        this.props.flux.getActions(AppActions.ID).recordLastPath(currentPath);
        this.props.flux.getActions(AppActions.ID).fetchWatches(true);

    }

    render() {
        return (
            <FluxComponent {...this.props}>
                <WatchTable watches={this.props.watches}/>
                <RouteHandler />
            </FluxComponent>
        );
    }
}
