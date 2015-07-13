import React from 'react';

import Homepage from 'views/Homepage/Homepage';
//import Code from 'views/Code/Code';
import AppActions from './AppActions';

import HomeFlux from 'views/Homepage/HomeFlux.js';
import HomeStore from 'views/Homepage/HomeStore.js';
import FluxComponent from 'flummox/component';

require('mossflower');
require('styles/global.less');
require('static?!./favicon.ico?output=favicon.ico');

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

        new HomeFlux(this.props.flux);
    }

    render() {
        return (
            <div>
                <FluxComponent {...this.props} connectToStores={[HomeStore.ID]}>
                    <Homepage {...this.props} />
                </FluxComponent>
            </div>
        );
    }
}

