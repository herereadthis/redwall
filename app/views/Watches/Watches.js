'use strict';

import React from 'react';
import { RouteHandler} from 'react-router';

import AppActions from 'AppActions';
import WatchTable from './WatchTable';

require('mossflower');
require('./watches.less');

export default class App extends React.Component {

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
        let currentPath = this.currentPath();
        this.props.flux.getActions(AppActions.ID).setCacheAge();
        this.props.flux.getActions(AppActions.ID).recordLastPath(currentPath);
        this.props.flux.getActions(AppActions.ID).fetchWatches(true);
    }

    render() {
        return (
            <div>
                <WatchTable watches={this.props.watches} />
                <RouteHandler />
            </div>
        );
    }
}

