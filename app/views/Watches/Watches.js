'use strict';

import React from 'react';
import { Link, RouteHandler} from 'react-router';

import AppActions from 'AppActions';

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
        //window.console.log(this.props.cacheAge, this.props.cacheValidity);
        window.console.log(this.props);
        return (
            <div>
                <p>Foo</p>
                <RouteHandler />
            </div>
        );
    }
}

