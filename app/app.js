'use strict';

import React from 'react';
import { Link, RouteHandler} from 'react-router';

import Homepage from 'views/Homepage/Homepage';
import Code from 'views/Code/Code';
import AppActions from './AppActions';

require("styles/global.less");
require("static?!./favicon.ico?output=favicon.ico");


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
        this.props.flux.getActions(AppActions.ID).recordLastPath(currentPath);
    }

    render() {
        return (
            <div>
                <Homepage {...this.props} />
                <RouteHandler />
            </div>
        );
    }
}

